
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { AuthService, User } from '@/services/auth';
import { toast } from '@/hooks/use-toast';

const AuthTester = () => {
  // State for form inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  
  // State for loading and current user
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Get current user on mount
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    
    // Listen for auth state changes
    const handleAuthChange = () => {
      setCurrentUser(AuthService.getCurrentUser());
    };
    
    window.addEventListener('auth_state_change', handleAuthChange);
    return () => {
      window.removeEventListener('auth_state_change', handleAuthChange);
    };
  }, []);
  
  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await AuthService.login({
        email: loginEmail,
        password: loginPassword
      });
      
      if (!success) {
        toast({
          title: "Login failed",
          description: "Check your credentials and try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await AuthService.register({
        name: registerName,
        email: registerEmail,
        password: registerPassword
      });
      
      if (!success) {
        toast({
          title: "Registration failed",
          description: "Check your information and try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };
  
  // Verify feature access
  const checkFeatureAccess = (featureName: string) => {
    const hasAccess = AuthService.hasFeatureAccess(featureName);
    toast({
      title: `Feature: ${featureName}`,
      description: hasAccess ? "You have access to this feature" : "You don't have access to this feature",
      variant: hasAccess ? "default" : "destructive"
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Authentication Test</h1>
      
      {/* Current user info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current User Status</CardTitle>
          <CardDescription>
            {currentUser ? "You are logged in" : "You are not logged in"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentUser ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {currentUser.name}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Role:</strong> {currentUser.role}</p>
              <p><strong>User ID:</strong> {currentUser.id}</p>
              
              {currentUser.subscription && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md dark:bg-gray-800">
                  <h3 className="text-lg font-semibold mb-2">Subscription</h3>
                  <p><strong>Plan:</strong> {currentUser.subscription.plan}</p>
                  <p><strong>Status:</strong> {currentUser.subscription.status}</p>
                  <p><strong>Expires:</strong> {new Date(currentUser.subscription.expiresAt).toLocaleDateString()}</p>
                  <div className="mt-2">
                    <p><strong>Features:</strong></p>
                    <ul className="list-disc list-inside">
                      {currentUser.subscription.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>Sign in or register to see user information</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentUser ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => checkFeatureAccess('premium_content')}
              >
                Check Premium Access
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Use the forms below to authenticate</p>
          )}
        </CardFooter>
      </Card>
      
      {/* Auth forms */}
      {!currentUser && (
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to sign in to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => AuthService.loginWithGoogle()}
                    disabled={isLoading}
                  >
                    Google Login
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => AuthService.loginWithApple()}
                    disabled={isLoading}
                  >
                    Apple Login
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create a new account to access our services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      placeholder="John Doe"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Register"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AuthTester;
