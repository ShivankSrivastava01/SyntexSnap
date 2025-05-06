'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Trash2, ChevronRight, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        router.push('/login');
        return;
      }

      const response = await axios.get(`http://localhost:5000/user/favorites/${userData._id}`);
      setFavorites(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to fetch favorites');
      setLoading(false);
    }
  };

  const removeFavorite = async (extensionId) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`http://localhost:5000/user/favorites/${userData._id}/${extensionId}`);
      toast.success('Extension removed from favorites');
      fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  const handleViewDetails = (extensionId) => {
    router.push(`/view-extension/${extensionId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Favorite Extensions</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Favorites Yet</h3>
          <p className="text-gray-500 mb-4">Start exploring and add extensions to your favorites!</p>
          <Button
            onClick={() => router.push('/browse-extensions')}
            variant="outline"
          >
            Browse Extensions
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((extension) => (
            <Card key={extension._id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{extension.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFavorite(extension._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardTitle>
                <CardDescription>{extension.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">
                    <Download className="mr-1 w-3 h-3" />
                    {extension.downloadCount || 0} downloads
                  </Badge>
                  {extension.techStack && (
                    <div className="flex flex-wrap gap-2">
                      {extension.techStack.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleViewDetails(extension._id)}
                >
                  View Details
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;