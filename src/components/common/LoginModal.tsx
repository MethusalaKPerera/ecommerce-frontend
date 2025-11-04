import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Alert from './Alert';
import { useUser } from '../../context/UserContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    
    if (success) {
      onClose();
      setEmail('');
      setPassword('');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login" size="small">
      <form onSubmit={handleSubmit}>
        {error && <Alert variant="error">{error}</Alert>}
        
        <Alert variant="info">
          <strong>Demo Credentials:</strong><br />
          Admin: admin@ecommerce.com / admin123<br />
          Customer: customer@ecommerce.com / customer123
        </Alert>

        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <Button type="submit" variant="primary" fullWidth>
            Login
          </Button>
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;