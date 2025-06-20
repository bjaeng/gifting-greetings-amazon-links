
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <span className="text-white font-medium hidden sm:block">
        {displayName}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={signOut}
        className="text-white hover:bg-white/20 p-2"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default UserProfile;
