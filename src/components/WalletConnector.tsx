import { Button } from "@/components/ui/button";
import { UserRole } from "@/contexts/AuthContext";

interface WalletConnectorProps {
  onWalletSelect: () => void;
  isLoading: boolean;
  role: UserRole;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onWalletSelect, isLoading, role }) => {
  return (
    <div className="space-y-4 text-center">
      <h3 className="text-lg font-semibold mb-2">Login with MetaMask</h3>
      <p className="text-sm text-gray-600 mb-4">Connect your MetaMask wallet to continue as a {role}.</p>
      <Button onClick={onWalletSelect} disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
        {isLoading ? 'Connecting...' : 'Connect MetaMask'}
      </Button>
    </div>
  );
};

export default WalletConnector;
