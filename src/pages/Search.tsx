
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ProfileCard, { Profile } from "@/components/ProfileCard";
import { mockProfiles, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Check, ChevronDown, ChevronUp, Filter } from "lucide-react";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minRating, setMinRating] = useState([3]);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call with delay
    setTimeout(() => {
      let results = [...mockProfiles];
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        results = results.filter(profile => 
          profile.skills.some(skill => skill.toLowerCase().includes(query)) ||
          profile.name.toLowerCase().includes(query) ||
          profile.title.toLowerCase().includes(query)
        );
      }
      
      // Filter by rating
      if (minRating.length > 0) {
        results = results.filter(profile => profile.rating >= minRating[0]);
      }
      
      // Filter by categories - would need to add categories to profiles in a real app
      if (selectedCategories.length > 0) {
        // This is a simplified example as our mock data doesn't have categories
        // Would implement actual category filtering here
      }
      
      setProfiles(results);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, minRating, selectedCategories]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-3xl font-bold">Find Skills</h1>
          
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} placeholder="Search for skills or people" />
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Filters sidebar */}
            <div className="md:col-span-1">
              <div className="rounded-lg border bg-card p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="md:hidden"
                    onClick={() => setFiltersOpen(!filtersOpen)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className={`space-y-6 ${filtersOpen ? 'block' : 'hidden md:block'}`}>
                  <div>
                    <Label className="mb-2 block">Minimum Rating</Label>
                    <div className="space-y-2">
                      <Slider 
                        defaultValue={minRating} 
                        max={5} 
                        min={1} 
                        step={0.5}
                        onValueChange={setMinRating}
                      />
                      <div className="text-sm text-muted-foreground">
                        {minRating[0]} stars or higher
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Categories</Label>
                    <div className="space-y-2">
                      {categories.slice(0, 6).map((category) => (
                        <div key={category} className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`flex h-8 w-full items-center justify-start gap-2 rounded-sm px-2 ${
                              selectedCategories.includes(category)
                                ? "bg-hiveprimary-100 text-hiveprimary-900"
                                : ""
                            }`}
                            onClick={() => toggleCategory(category)}
                          >
                            <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                              {selectedCategories.includes(category) && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                            <span>{category}</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Location</Label>
                    <Input type="text" placeholder="City or country" />
                  </div>
                  
                  <Button 
                    className="w-full bg-hiveprimary-600 hover:bg-hiveprimary-700"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Results grid */}
            <div className="md:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-80 rounded-lg bg-muted animate-pulse" />
                  ))}
                </div>
              ) : profiles.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {profiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border bg-card p-8 text-center">
                  <h3 className="mb-2 text-xl font-semibold">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
