import express from "express";
const app = express();
const port = 3000;
let currUser;
let lastId = 10;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

let posts = [
  {
    id: 1,
    title: "How to Start a Blog in 2021",
    content:
      "Blogging is a great way to share your ideas, opinions, and expertise with the world. But how do you start a blog in 2021? In this post, I will guide you through the steps of creating your own blog, from choosing a platform and domain name, to designing your layout and writing your first post.",
    date: "Published on January 9, 2024",
    image: "Some image",
  },
  {
    id: 2,
    title: "The Benefits of Meditation for Your Mind and Body",
    content:
      "Meditation is a practice that involves focusing your attention on a single object, thought, or sensation, such as your breath, a mantra, or a candle flame. Meditation can help you reduce stress, improve your mood, enhance your creativity, and boost your immune system. In this post, I will explain how meditation works and how you can start meditating today.",
    date: "Published on January 10, 2024",
  },
  {
    id: 3,
    title: "The Best Books I Read in 2023",
    content:
      "Reading is one of my favorite hobbies, and I always try to read at least one book per month. In 2023, I read some amazing books that inspired me, entertained me, and taught me something new. In this post, I will share with you the best books I read in 2023, and why I recommend them to you.",
    date: "Published on January 11, 2024",
    image: "Some image",
  },
  {
    id: 4,
    title: "How to Travel the World on a Budget",
    content:
      "Traveling is a wonderful way to explore new places, cultures, and experiences. But traveling can also be expensive, especially if you want to visit multiple destinations. How can you travel the world on a budget? In this post, I will share with you some tips and tricks that I learned from my own travels, such as how to find cheap flights, accommodation, and activities.",
    date: "Published on January 12, 2024",
    image: "Some image",
  },
  {
    id: 5,
    title: "How to Learn a New Language Fast and Easy",
    content:
      "Learning a new language can open up new opportunities, enrich your communication skills, and broaden your perspective. But learning a new language can also be challenging, especially if you don't have much time or motivation. How can you learn a new language fast and easy? In this post, I will share with you some methods and resources that I used to learn Spanish, French, and German in less than a year.",
    date: "Published on January 13, 2024",
    image: "Some image",
  },
  {
    id: 6,
    title: "How to Cook Delicious and Healthy Meals at Home",
    content:
      "Cooking is a skill that can benefit you in many ways. Cooking can help you save money, eat healthier, and impress your friends and family. But cooking can also be intimidating, especially if you don't have much experience or confidence. How can you cook delicious and healthy meals at home? In this post, I will share with you some recipes, tips, and tools that I use to make my own meals every day.",
    date: "Published on January 14, 2024",
  },
  {
    id: 7,
    title: "How to Build Your Own Website in 2021",
    content:
      "Building your own website can be a fun and rewarding project. You can use your website to showcase your portfolio, promote your business, or share your personal stories. But how do you build your own website in 2021? In this post, I will show you how to create your own website from scratch, using HTML, CSS, and JavaScript, without any coding experience.",
    date: "Published on January 15, 2024",
    image: "Some image",
  },
  {
    id: 8,
    title: "The Best Movies I Watched in 2023",
    content:
      "Watching movies is one of my favorite ways to relax and enjoy myself. I love watching movies of different genres, from comedy and romance, to thriller and horror. In 2023, I watched some amazing movies that made me laugh, cry, and think. In this post, I will share with you the best movies I watched in 2023, and why I think you should watch them too.",
    date: "Published on January 16, 2024",
  },
  {
    id: 9,
    title: "How to Start a Podcast in 2021",
    content:
      "Podcasting is a popular and growing medium that allows you to share your voice, message, and personality with the world. Podcasting can also help you build your brand, grow your audience, and earn money. But how do you start a podcast in 2021? In this post, I will walk you through the steps of creating your own podcast, from choosing a topic and name, to recording and editing your episodes, to publishing and promoting your podcast.",
    date: "Published on January 17, 2024",
  },
  {
    id: 10,
    title: "The Best Apps I Used in 2023",
    content:
      "Apps are essential tools that can help you with various tasks, such as productivity, communication, entertainment, and education. Apps can also make your life easier, more fun, and more efficient. In 2023, I used some amazing apps that improved my quality of life and helped me achieve my goals. In this post, I will share with you the best apps I used in 2023, and why I think you should try them too.",
    date: "Published on January 18, 2024",
    image: "Some image",
  },
];

const usersArray = [
  { username: "Paul", password: "5678" },
  { username: "Jonas", password: "1234" },
  { username: "Ann", password: "4321" },
  { username: "Kate", password: "1357" },
  { username: "Diego", password: "9999" },
];

app.get("/", (req, res) => {
  res.render("login.ejs");
});

const findUser = (username, password) => {
  return usersArray.find(
    (user) => user.username === username && user.password === password
  );
};

app.post("/posts", (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username, password);

  if (user) currUser = user;

  if (user || currUser) {
    res.render("posts.ejs", { posts });
  } else {
    res.render("login.ejs");
  }
});

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { posts });
});

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});

const deletePost = function (pos) {
  posts.splice(pos, 1);
};

const findPost = function (id, toDelete = false) {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;

  if (toDelete) deletePost(index);

  return posts[index];
};

app.get("/delete-post/:postId", (req, res) => {
  const postIdToDelete = req.params.postId;
  findPost(+postIdToDelete, true);
  res.redirect("/posts");
});

app.post("/submit-edit", (req, res) => {
  const postIdToEdit = req.body.id;
  const postToEdit = findPost(+postIdToEdit);
  postToEdit.title = req.body.title;
  postToEdit.content = req.body.content;
  postToEdit.image = req.body.image;
  res.redirect("/posts");
});

app.post("/edit-post/:postId", (req, res) => {
  const postIdToEdit = req.params.postId;
  const postToEdit = findPost(+postIdToEdit);
  res.render("edit-post.ejs", { post: postToEdit });
});

app.get("/create-post", function (req, res) {
  res.render("create-post.ejs");
});

app.post("/submit-create-post", function (req, res) {
  const { title, content, image } = req.body;
  posts.unshift({ title, content, image, id: ++lastId });
  res.redirect("/posts");
});
