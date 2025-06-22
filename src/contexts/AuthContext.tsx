import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { reverseResolveENS, formatAddress } from '@/utils/ensUtils';
import axios from 'axios';
import { ethers } from 'ethers';

export type UserRole = 'student' | 'recruiter';

export interface User {
  id: string;
  address: string;
  ensName?: string;
  email?: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  company?: string; // for recruiters
  experience?: string; // for students
  isVerified: boolean;
  createdAt: Date;
  walletType?: string; // track which wallet was used
  chainId?: number; // track current chain
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (role: UserRole) => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'github', role: UserRole) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  switchChain: (chainId: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('credilink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const connectWallet = async (): Promise<{ address: string; chainId: number }> => {
    if (typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
      throw new Error('MetaMask is not detected. Please install MetaMask.');
    }
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }
      const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string;
      return {
        address: accounts[0],
        chainId: parseInt(chainId, 16)
      };
    } catch (error) {
      throw new Error(`Failed to connect MetaMask: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const login = async (role: UserRole) => {
    setIsLoading(true);
    try {
      const { address, chainId } = await connectWallet();

      // --- LOGIN FLOW ---
      // Check if user exists with the selected role
      const userKey = `credilink_user_${role}_${address}`;
      const existingUserJSON = localStorage.getItem(userKey);

      if (existingUserJSON) {
        // User exists, so log them in
        const existingUser = JSON.parse(existingUserJSON);
        setUser(existingUser);
        localStorage.setItem('credilink_user', JSON.stringify(existingUser)); // for general session
        toast({
          title: 'Login Successful!',
          description: `Welcome back, ${existingUser.name}!`,
        });
        setIsLoading(false);
        return;
      }

      // --- SIGNUP FLOW ---
      // User does not exist with selected role, check if they exist with the OTHER role
      const otherRole = role === 'student' ? 'recruiter' : 'student';
      const otherUserKey = `credilink_user_${otherRole}_${address}`;
      const otherUserExists = localStorage.getItem(otherUserKey);

      if (otherUserExists) {
        toast({
          title: 'Signup Failed',
          description: `This wallet is already registered as a ${otherRole}. Please log in with that role.`,
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Wallet is new, so create a new user
      const newUser: User = {
        id: address,
        address,
        name: `${role === 'student' ? 'Student' : 'Recruiter'} ${formatAddress(address)}`,
        role,
        isVerified: false,
        createdAt: new Date(),
        walletType: 'metamask',
        chainId,
        skills: [],
        bio: '',
        avatar: '',
        company: '',
        experience: '',
        ensName: '',
        email: '',
      };
      
      localStorage.setItem(userKey, JSON.stringify(newUser)); // Save with role-specific key
      setUser(newUser);
      localStorage.setItem('credilink_user', JSON.stringify(newUser)); // for general session
      
      toast({
        title: 'Signup Successful!',
        description: `Welcome to CrediLink+ as a ${role}!`,
      });

    } catch (error) {
      toast({
        title: 'Login/Signup Failed',
        description: error instanceof Error ? error.message : 'Failed to connect',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOAuth = async (provider: 'google' | 'github', role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate OAuth login (in real app, this would integrate with actual OAuth providers)
      const mockUser: User = {
        id: `${provider}_${Date.now()}`,
        address: '',
        email: `user@${provider}.com`,
        name: `${provider} User`,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        isVerified: true,
        createdAt: new Date(),
      };

      setUser(mockUser);
      localStorage.setItem('credilink_user', JSON.stringify(mockUser));
      
      toast({
        title: 'Login Successful!',
        description: `Welcome to CrediLink+ via ${provider}!`,
      });
    } catch (error) {
      toast({
        title: 'OAuth Login Failed',
        description: `Failed to login with ${provider}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchChain = async (targetChainId: number) => {
    if (!window.ethereum || !user) return;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
      
      // Update user's chain ID
      const updatedUser = { ...user, chainId: targetChainId };
      setUser(updatedUser);
      localStorage.setItem('credilink_user', JSON.stringify(updatedUser));
      
      toast({
        title: 'Chain Switched',
        description: `Switched to chain ${targetChainId}`,
      });
    } catch (error) {
      toast({
        title: 'Chain Switch Failed',
        description: 'Failed to switch blockchain network',
        variant: 'destructive',
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('credilink_user');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('credilink_user', JSON.stringify(updatedUser));
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });
    }
  };

  const signup = async (role: UserRole) => {
    setIsLoading(true);
    try {
      const { address } = await connectWallet();

      // Check if already registered
      const existing = localStorage.getItem('credilink_user_' + address);
      if (existing) {
        toast({
          title: 'Signup Failed',
          description: 'This wallet is already registered. Please log in instead.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // ...proceed with SIWE flow, then:
      const newUser: User = {
        id: address,
        address,
        name: `${role === 'student' ? 'Student' : 'Recruiter'} ${formatAddress(address)}`,
        role,
        isVerified: false,
        createdAt: new Date(),
        walletType: 'metamask',
        chainId: 1, // Assuming default chainId
      };
      localStorage.setItem('credilink_user_' + address, JSON.stringify(newUser));
      // ...rest of your logic
    } catch (error) {
      // ...error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      loginWithOAuth,
      logout,
      updateProfile,
      switchChain,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
