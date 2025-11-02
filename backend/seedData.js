import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Blog from './models/Blog.js';
import connectDB from './config/db.js';

dotenv.config();

const dummyBlogs = [
  {
    title: 'Getting Started with React and Redux',
    content: `<h2>Introduction to Modern Web Development</h2>
    <p>React has revolutionized the way we build user interfaces. Combined with Redux for state management, it creates a powerful ecosystem for building scalable applications.</p>
    <p>In this comprehensive guide, we'll explore the fundamentals of React and how Redux complements it by providing a predictable state container.</p>
    <h3>Why React?</h3>
    <p>React's component-based architecture allows developers to build reusable UI components. This modularity makes code more maintainable and easier to test.</p>
    <h3>Redux State Management</h3>
    <p>Redux helps manage application state in a centralized store, making it easier to track changes and debug your application. The unidirectional data flow ensures predictable behavior.</p>
    <blockquote>Redux is a predictable state container for JavaScript applications.</blockquote>
    <p>By the end of this article, you'll understand how to integrate Redux with React and build robust applications.</p>`,
    excerpt: 'Learn how to build modern web applications using React and Redux. A comprehensive guide for beginners.',
    category: 'Technology',
    tags: ['react', 'redux', 'javascript', 'web development'],
    status: 'published',
    views: 245,
  },
  {
    title: 'The Ultimate Guide to Healthy Living',
    content: `<h2>Transform Your Life with These Simple Habits</h2>
    <p>Healthy living isn't about drastic changes—it's about sustainable habits that improve your overall well-being.</p>
    <h3>1. Nutrition Matters</h3>
    <p>Eating a balanced diet rich in fruits, vegetables, whole grains, and lean proteins is fundamental to good health. Avoid processed foods and excessive sugar.</p>
    <h3>2. Regular Exercise</h3>
    <p>Aim for at least 30 minutes of moderate exercise daily. This can include walking, jogging, swimming, or yoga. Physical activity boosts mood and energy levels.</p>
    <h3>3. Quality Sleep</h3>
    <p>Get 7-9 hours of sleep each night. Quality sleep is crucial for physical recovery and mental health.</p>
    <h3>4. Hydration</h3>
    <p>Drink at least 8 glasses of water daily. Proper hydration supports all bodily functions and improves skin health.</p>
    <h3>5. Mental Wellness</h3>
    <p>Practice mindfulness, meditation, or journaling to maintain mental health. Take breaks and manage stress effectively.</p>
    <blockquote>Health is wealth. Invest in yourself every day.</blockquote>`,
    excerpt: 'Discover the essential habits for a healthier, happier life. Your journey to wellness starts here.',
    category: 'Health',
    tags: ['health', 'wellness', 'lifestyle', 'fitness'],
    status: 'published',
    views: 567,
  },
  {
    title: 'Top 10 Travel Destinations for 2025',
    content: `<h2>Explore the World's Most Amazing Places</h2>
    <p>Travel broadens the mind and creates unforgettable memories. Here are the top destinations you should visit in 2025.</p>
    <h3>1. Santorini, Greece</h3>
    <p>Famous for its stunning sunsets, white-washed buildings, and crystal-clear waters. Perfect for romantic getaways.</p>
    <h3>2. Kyoto, Japan</h3>
    <p>Experience traditional Japanese culture, beautiful temples, and cherry blossoms. A must-visit for culture enthusiasts.</p>
    <h3>3. Iceland</h3>
    <p>Witness the Northern Lights, explore volcanic landscapes, and relax in geothermal hot springs.</p>
    <h3>4. New Zealand</h3>
    <p>Adventure paradise with stunning fjords, mountains, and outdoor activities. Perfect for thrill-seekers.</p>
    <h3>5. Morocco</h3>
    <p>Vibrant markets, ancient cities, and Sahara Desert adventures await you in this North African gem.</p>
    <p>Each destination offers unique experiences that will enrich your life and create lasting memories.</p>`,
    excerpt: 'Planning your next adventure? Check out these incredible destinations that should be on your bucket list.',
    category: 'Travel',
    tags: ['travel', 'destinations', 'adventure', 'vacation'],
    status: 'published',
    views: 892,
  },
  {
    title: 'Mastering JavaScript ES6+ Features',
    content: `<h2>Modern JavaScript for Today's Developers</h2>
    <p>ES6 (ECMAScript 2015) and subsequent versions have introduced powerful features that make JavaScript more elegant and efficient.</p>
    <h3>Arrow Functions</h3>
    <pre><code>const add = (a, b) => a + b;</code></pre>
    <p>Arrow functions provide a concise syntax and lexical 'this' binding.</p>
    <h3>Destructuring</h3>
    <pre><code>const { name, age } = person;
const [first, second] = array;</code></pre>
    <h3>Template Literals</h3>
    <pre><code>const greeting = \`Hello, \${name}! You are \${age} years old.\`;</code></pre>
    <h3>Promises and Async/Await</h3>
    <p>Handle asynchronous operations elegantly with modern syntax.</p>
    <pre><code>async function fetchData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}</code></pre>
    <h3>Spread Operator</h3>
    <pre><code>const newArray = [...oldArray, newItem];
const mergedObject = { ...obj1, ...obj2 };</code></pre>
    <blockquote>Understanding ES6+ features is essential for modern JavaScript development.</blockquote>`,
    excerpt: 'Deep dive into ES6+ features that every JavaScript developer should know. Level up your coding skills.',
    category: 'Technology',
    tags: ['javascript', 'es6', 'programming', 'tutorial'],
    status: 'published',
    views: 423,
  },
  {
    title: 'Delicious Mediterranean Diet Recipes',
    content: `<h2>Healthy and Tasty Mediterranean Cuisine</h2>
    <p>The Mediterranean diet is renowned for its health benefits and delicious flavors. Here are some amazing recipes to try.</p>
    <h3>Greek Salad</h3>
    <p>Fresh tomatoes, cucumbers, olives, feta cheese, and olive oil create a refreshing and healthy meal.</p>
    <h3>Grilled Fish with Lemon</h3>
    <p>Simple yet flavorful. Fresh fish grilled with herbs, garlic, and lemon juice.</p>
    <h3>Hummus and Vegetables</h3>
    <p>Creamy chickpea dip served with fresh vegetables. Perfect for snacking or appetizers.</p>
    <h3>Pasta Primavera</h3>
    <p>Whole grain pasta with seasonal vegetables, olive oil, and fresh herbs.</p>
    <h3>Health Benefits</h3>
    <ul>
      <li>Rich in healthy fats from olive oil and fish</li>
      <li>High in antioxidants from fruits and vegetables</li>
      <li>Promotes heart health and longevity</li>
      <li>Supports weight management</li>
    </ul>
    <blockquote>Good food is the foundation of genuine happiness.</blockquote>`,
    excerpt: 'Explore delicious and healthy Mediterranean recipes that are easy to make and incredibly satisfying.',
    category: 'Food',
    tags: ['recipes', 'mediterranean', 'healthy eating', 'cooking'],
    status: 'published',
    views: 334,
  },
  {
    title: 'Building a Successful Startup: Lessons Learned',
    content: `<h2>From Idea to Reality: The Startup Journey</h2>
    <p>Starting a business is challenging but rewarding. Here are key lessons from successful entrepreneurs.</p>
    <h3>1. Validate Your Idea</h3>
    <p>Before investing time and money, ensure there's a market for your product. Talk to potential customers and gather feedback.</p>
    <h3>2. Build a Strong Team</h3>
    <p>Your team is your greatest asset. Hire people who share your vision and complement your skills.</p>
    <h3>3. Focus on Customer Value</h3>
    <p>Always prioritize solving real problems for your customers. Value creation leads to sustainable growth.</p>
    <h3>4. Iterate Quickly</h3>
    <p>Launch an MVP (Minimum Viable Product) and gather user feedback. Iterate based on real-world data.</p>
    <h3>5. Manage Cash Flow</h3>
    <p>Cash is king in startups. Monitor expenses carefully and ensure you have runway for growth.</p>
    <h3>6. Network and Learn</h3>
    <p>Connect with other entrepreneurs, attend events, and never stop learning from others' experiences.</p>
    <blockquote>The only way to do great work is to love what you do. - Steve Jobs</blockquote>`,
    excerpt: 'Essential lessons for aspiring entrepreneurs. Learn from those who have successfully built startups.',
    category: 'Business',
    tags: ['startup', 'entrepreneurship', 'business', 'leadership'],
    status: 'published',
    views: 678,
  },
  {
    title: 'The Future of Artificial Intelligence',
    content: `<h2>AI Revolution: What's Coming Next?</h2>
    <p>Artificial Intelligence is transforming every industry. Let's explore what the future holds.</p>
    <h3>Machine Learning Advancements</h3>
    <p>ML models are becoming more sophisticated, enabling better predictions and automation across industries.</p>
    <h3>Natural Language Processing</h3>
    <p>AI assistants are becoming more conversational and understanding context better than ever before.</p>
    <h3>Computer Vision</h3>
    <p>From autonomous vehicles to medical imaging, computer vision is revolutionizing how machines see the world.</p>
    <h3>Ethical Considerations</h3>
    <p>As AI becomes more powerful, we must address ethical concerns around privacy, bias, and job displacement.</p>
    <h3>Industry Applications</h3>
    <ul>
      <li>Healthcare: Diagnosis and drug discovery</li>
      <li>Finance: Fraud detection and trading</li>
      <li>Transportation: Self-driving cars</li>
      <li>Education: Personalized learning</li>
    </ul>
    <blockquote>AI is the new electricity. - Andrew Ng</blockquote>`,
    excerpt: 'Exploring the cutting-edge developments in AI and their impact on society and industry.',
    category: 'Technology',
    tags: ['ai', 'machine learning', 'technology', 'future'],
    status: 'published',
    views: 1024,
  },
  {
    title: 'Minimalist Living: Less is More',
    content: `<h2>Simplify Your Life Through Minimalism</h2>
    <p>Minimalism isn't about having less—it's about making room for more of what matters.</p>
    <h3>Benefits of Minimalist Living</h3>
    <p>Less stress, more clarity, improved focus, and financial freedom. When you own less, less owns you.</p>
    <h3>Getting Started</h3>
    <ul>
      <li>Declutter one room at a time</li>
      <li>Keep only items that add value to your life</li>
      <li>Adopt the one-in-one-out rule</li>
      <li>Focus on experiences over possessions</li>
    </ul>
    <h3>Digital Minimalism</h3>
    <p>Extend minimalism to your digital life. Unsubscribe from unnecessary emails, delete unused apps, and limit social media time.</p>
    <h3>Financial Impact</h3>
    <p>Minimalism naturally leads to spending less on unnecessary items, allowing you to save and invest more.</p>
    <blockquote>Simplicity is the ultimate sophistication. - Leonardo da Vinci</blockquote>`,
    excerpt: 'Discover how minimalist living can bring more peace, clarity, and happiness to your daily life.',
    category: 'Lifestyle',
    tags: ['minimalism', 'lifestyle', 'simplicity', 'wellness'],
    status: 'published',
    views: 445,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('📌 Cleared existing blogs');

    // Check if demo user exists, create if not
    let demoUser = await User.findOne({ email: 'demo@bloghub.com' });
    
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Demo Author',
        email: 'demo@bloghub.com',
        password: 'demo123456',
        bio: 'I am a passionate writer sharing insights on technology, lifestyle, health, and more. Welcome to my blog!',
        avatar: 'https://i.pravatar.cc/150?img=12',
        isAdmin: false,
        isActive: true,
      });
      console.log('✅ Created demo user');
    } else {
      console.log('✅ Demo user already exists');
    }

    // Create blogs with the demo user as author
    const blogsWithAuthor = dummyBlogs.map(blog => ({
      ...blog,
      author: demoUser._id,
      likes: [],
      comments: [],
    }));

    const createdBlogs = await Blog.insertMany(blogsWithAuthor);
    console.log(`✅ Created ${createdBlogs.length} dummy blogs`);

    // Create admin user if doesn't exist
    let adminUser = await User.findOne({ email: 'admin@bloghub.com' });
    
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@bloghub.com',
        password: 'admin123456',
        bio: 'Administrator of BlogHub platform',
        avatar: 'https://i.pravatar.cc/150?img=68',
        isAdmin: true,
        isActive: true,
      });
      console.log('✅ Created admin user');
    } else {
      console.log('✅ Admin user already exists');
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 User Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Demo User:');
    console.log('   Email: demo@bloghub.com');
    console.log('   Password: demo123456');
    console.log('\n👨‍💼 Admin User:');
    console.log('   Email: admin@bloghub.com');
    console.log('   Password: admin123456');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
