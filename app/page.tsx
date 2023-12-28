"use client";

import React, { useState, useEffect } from "react";

const dummyImg =
  "https://rjcolorado.org/wp-content/uploads/2016/04/dummy-post-square-1.jpg";

interface Community {
  id: string;
  name: string;
  imgUrl: string;
}

interface Home {
  communityId: string;
  price: number;
}

const CommunityInfo: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchCommunities();
      await fetchHomes();
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await fetch("/api/get-communities");
      const data: { data: Community[] } = await response.json();
      console.log(data);
      setCommunities(data.data);
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  };

  const fetchHomes = async () => {
    try {
      const response = await fetch("/api/get-homes");
      const data: { data: Home[] } = await response.json();
      console.log(data);
      setHomes(data.data);
    } catch (error) {
      console.error("Error fetching homes:", error);
    }
  };

  function formatUSD(value: number): string {
    const formattedValue = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedValue;
  }

  const calculateAveragePrice = (communityId: string): string | boolean => {
    const communityHomes = homes.filter(
      (home) => home.communityId === communityId
    );
    const totalPrices = communityHomes.reduce(
      (sum, home) => sum + home.price,
      0
    );
    const averagePrice = totalPrices / communityHomes.length || 0;
    if (averagePrice) return formatUSD(averagePrice);
    else return false;
  };

  return (
    <div>
      <h1 className="bg-white text-black p-4 text-3xl">
        Community Information
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="w-full flex flex-wrap">
          {communities.map((community) => (
            <div className="lg:w-1/4 p-4 md:w-1/2 w-full" key={community.id}>
              <div className="bg-white p-4 rounded-xl text-black">
                <img
                  className="w-full h-60 object-cover"
                  src={community.imgUrl}
                  alt={community.name}
                  onError={(event: any) => {
                    event.target.src = dummyImg;
                    event.onerror = null;
                  }}
                />
                <h2 className="font-semibold">{community.name}</h2>
                <p className="">
                  Average Price:{" "}
                  {calculateAveragePrice(community.id)
                    ? calculateAveragePrice(community.id)
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityInfo;
