// customerblogData.js
 
import img1 from "../assets/images/blogs/blogIce.jpg";
import img2 from "../assets/images/blogs/blogSahara.jpg";
import img3 from "../assets/images/blogs/blogcolorOfIndia.jpg";
 
const customerblogData = [
  // Transporter 1 Blogs
  {
    id: 1,
    transporterId: 1,
    title: "Discover the Beauty of Iceland",
    desc: "Explore Iceland’s raw landscapes and unique adventures.",
    img: img1,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Iceland offers unmatched natural beauty and adventure opportunities...",
      {
        type: "list",
        items: ["Volcanoes", "Waterfalls", "Glaciers"]
      },
      "Partner with us to offer unforgettable Icelandic tours."
    ]
  },
  {
    id: 2,
    transporterId: 1,
    title: "Northern Lights Expedition",
    desc: "Attract clients with a once-in-a-lifetime aurora experience.",
    img: img1,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "The northern lights draw travelers from all over the world...",
      {
        type: "list",
        items: ["Private tours", "Photography guides", "Best viewing spots"]
      }
    ]
  },
  {
    id: 3,
    transporterId: 1,
    title: "Thermal Spas & Wellness",
    desc: "Highlight Iceland’s geothermal spas for relaxation tours.",
    img: img1,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Include Blue Lagoon and Secret Lagoon in your itineraries...",
      {
        type: "list",
        items: ["Luxury wellness packages", "Spa + Sightseeing", "Group discounts"]
      }
    ]
  },
 
  // Transporter 2 Blogs
  {
    id: 4,
    transporterId: 2,
    title: "Desert Dreams: Touring the Sahara",
    desc: "An authentic cultural and desert journey for explorers.",
    img: img2,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "The Sahara is a land of endless dunes and Berber culture...",
      {
        type: "list",
        items: ["Camel rides", "Nomadic tents", "Sahara glamping"]
      }
    ]
  },
  {
    id: 5,
    transporterId: 2,
    title: "Sahara Sunset Escapes",
    desc: "Create magical moments in golden hour desert settings.",
    img: img2,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Sunset camel rides and tea in the dunes are unforgettable...",
      {
        type: "list",
        items: ["Photo packages", "Couple tours", "Fire dance events"]
      }
    ]
  },
  {
    id: 6,
    transporterId: 2,
    title: "Historic Caravan Routes",
    desc: "Take travelers back in time along trade caravan paths.",
    img: img2,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Recreate the old Sahara trade routes for cultural buffs...",
      {
        type: "list",
        items: ["Local guide storytelling", "Craft markets", "Food trails"]
      }
    ]
  },
 
  // Transporter 3 Blogs
  {
    id: 7,
    transporterId: 3,
    title: "Colors of India: A Cultural Journey",
    desc: "Celebrate India’s vibrant traditions and spiritual richness.",
    img: img3,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "India is a sensory delight, from festivals to food...",
      {
        type: "list",
        items: ["Holi & Diwali", "Street food walks", "Temple tours"]
      }
    ]
  },
  {
    id: 8,
    transporterId: 3,
    title: "Spiritual Circuits in North India",
    desc: "A divine experience through sacred destinations.",
    img: img3,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "Rishikesh, Varanasi, and Ayodhya form a spiritual triangle...",
      {
        type: "list",
        items: ["Ganga Aarti", "Yoga Ashrams", "Puja rituals"]
      }
    ]
  },
  {
    id: 9,
    transporterId: 3,
    title: "Indian Cuisine & Culture Tours",
    desc: "Let tourists savor the real India through food and folklore.",
    img: img3,
    imgStyle: "w-full h-[200px] object-cover rounded-lg",
    content: [
      "India’s diverse food tells stories of its culture...",
      {
        type: "list",
        items: ["Cooking classes", "Spice markets", "Food safaris"]
      }
    ]
  },
];
 
export default customerblogData;
 
 