'use client'

import React, { useState, useEffect } from 'react'
import { Search, Download, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const popularExtensions = [
  { id: 1, name: "Prettier", description: "Code formatter", downloads: "29.3M" },
  { id: 2, name: "ESLint", description: "Linter", downloads: "25.7M" },
  { id: 3, name: "GitLens", description: "Git supercharged", downloads: "22.1M" },
]

const categories = [
  "Programming Languages",
  "Snippets",
  "Linters",
  "Debuggers",
  "Themes",
  "Formatters",
]

const techstack = [
  "MERN",
  "MEAN",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "C#",
]

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setShowResults(true);

    try {
      const response = await fetch(`http://localhost:5000/req-publish/search?query=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching extensions:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (extensionId) => {
    router.push(`/view-extension/${extensionId}`);
  };

  const handleCategoryClick = (category) => {
    router.push(`/browse-category?category=${encodeURIComponent(category)}`);
  };

  const handleTechStackClick = (stack) => {
    router.push(`/browse-techstack?stack=${encodeURIComponent(stack)}`);
  };

  return (
    <>

      <Navbar />

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow mx-auto px-4 py-8 container">

          {/* Search Bar */}
          <section className="mb-12">
            <h2 className="mb-4 font-bold text-3xl">Discover Extensions</h2>
            <form onSubmit={handleSearch} className="flex max-w-md">
              <Input
                type="search"
                placeholder="Search extensions..."
                className="flex-grow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="ml-2">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </section>

          {/* Search Results Section */}
          {showResults && (
            <section className="mb-12">
              {loading ? (
                <div className="text-center">Searching...</div>
              ) : (
                <>
                  {searchResults.length > 0 ? (
                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {searchResults.map((extension) => (
                        <Card key={extension._id}>
                          <CardHeader>
                            <CardTitle>{extension.name}</CardTitle>
                            <CardDescription>{extension.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Badge variant="secondary" className="mb-2">
                              <Download className="mr-1 w-3 h-3" />
                              {extension.downloadCount} downloads
                            </Badge>
                          </CardContent>
                          <CardFooter>
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
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No extensions found matching "{searchQuery}"</p>
                      <Button
                        variant="link"
                        onClick={() => setShowResults(false)}
                        className="mt-2"
                      >
                        Clear Search
                      </Button>
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {/* Popular Extensions */}
          <section className="mb-12">
            <h2 className="mb-4 font-bold text-2xl">Popular Extensions</h2>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {popularExtensions.map((extension) => (
                <Card key={extension.id}>
                  <CardHeader>
                    <CardTitle>{extension.name}</CardTitle>
                    <CardDescription>{extension.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-2">
                      <Download className="mr-1 w-3 h-3" />
                      {extension.downloads} downloads
                    </Badge>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleViewDetails(extension.id)}
                    >
                      View Details
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* By Category */}
          <section className="mb-12">
            <h2 className="mb-4 font-bold text-2xl">Browse by Category</h2>
            <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="justify-between text-left"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              ))}
            </div>
          </section>

          {/* By Tech-Stack */}
          <section>
            <h2 className="mb-4 font-bold text-2xl">Browse by Tech-Stack</h2>
            <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {techstack.map((stack) => (
                <Button
                  key={stack}
                  variant="outline"
                  className="justify-between text-left"
                  onClick={() => handleTechStackClick(stack)}
                >
                  {stack}
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              ))}
            </div>
          </section>

        </main>
      </div>
      
    </>
  )
}

export default Home;