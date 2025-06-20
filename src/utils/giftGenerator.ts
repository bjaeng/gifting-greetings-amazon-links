
// Gift pool with more variety for random selection
const giftPool = {
  family: [
    {
      key: 'smartWatch',
      amazonUrl: 'https://amazon.com/dp/B0CHX7R6WJ',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
    },
    {
      key: 'coffeeSet',
      amazonUrl: 'https://amazon.com/dp/B08XQZQ6JX',
      imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop'
    },
    {
      key: 'photoFrame',
      amazonUrl: 'https://amazon.com/dp/B07XBQBR7B',
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'
    },
    {
      key: 'kitchenAppliance',
      amazonUrl: 'https://amazon.com/dp/B08XBQR9K2',
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    },
    {
      key: 'plantPot',
      amazonUrl: 'https://amazon.com/dp/B09PLMK5T3',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop'
    },
    {
      key: 'blanket',
      amazonUrl: 'https://amazon.com/dp/B08CZYQ1M7',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop'
    }
  ],
  friends: [
    {
      key: 'portableSpeaker',
      amazonUrl: 'https://amazon.com/dp/B0882HHZLW',
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
    },
    {
      key: 'skinCareKit',
      amazonUrl: 'https://amazon.com/dp/B08TBXNK4L',
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop'
    },
    {
      key: 'bookSet',
      amazonUrl: 'https://amazon.com/dp/B09XVTPMH9',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
    },
    {
      key: 'candles',
      amazonUrl: 'https://amazon.com/dp/B07QNMX8K9',
      imageUrl: 'https://images.unsplash.com/photo-1602874801006-c4b7c8b23c17?w=400&h=300&fit=crop'
    },
    {
      key: 'teaSet',
      amazonUrl: 'https://amazon.com/dp/B08HDMP7Q5',
      imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
    },
    {
      key: 'phoneAccessory',
      amazonUrl: 'https://amazon.com/dp/B09JKMP3R8',
      imageUrl: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=300&fit=crop'
    }
  ],
  kids: [
    {
      key: 'buildingBlocks',
      amazonUrl: 'https://amazon.com/dp/B08FD6QLH2',
      imageUrl: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop'
    },
    {
      key: 'artSupplies',
      amazonUrl: 'https://amazon.com/dp/B08M3K2QXZ',
      imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'
    },
    {
      key: 'scienceKit',
      amazonUrl: 'https://amazon.com/dp/B08CZXXR9M',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop'
    },
    {
      key: 'puzzleGame',
      amazonUrl: 'https://amazon.com/dp/B07KPQM9R3',
      imageUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop'
    },
    {
      key: 'toyRobot',
      amazonUrl: 'https://amazon.com/dp/B08RQJM7K9',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
    },
    {
      key: 'musicToy',
      amazonUrl: 'https://amazon.com/dp/B08HNMP5Q2',
      imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    }
  ]
};

// Function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate random gift suggestions (3 per category)
export function generateRandomGifts() {
  return {
    family: shuffleArray(giftPool.family).slice(0, 3),
    friends: shuffleArray(giftPool.friends).slice(0, 3),
    kids: shuffleArray(giftPool.kids).slice(0, 3)
  };
}
