Memory Trainer

This is a small web app I built to help people memorize text like Bible verses, quotes, or anything they want to remember. It has three ways to practice:

1. Fill in the Gaps – one word is hidden and you have to type it back in.
2. Arrange the Words – the words get mixed up and you try to put them back in order in your head.
3. Complete the Words – only the first letter of each word shows, the rest is blanked out, and you try to recall the full word.

I built the whole thing with Node.js and Express, and everything (HTML, CSS, JS) is served from one file, so it's simple and easy to run.

Tech I used
Node.js
Docker
AWS EC2 (to host it live)
Docker Hub (to store and share the image)

How to run it

Locally:
npm install
npm start

With Docker:
docker pull agbaraoluwa07/memory-trainer:1.2
docker run -d -p 3000:3000 agbaraoluwa07/memory-trainer:1.2

Challenges I faced and how I fixed them

While deploying this, I ran into a few real problems and had to figure them out one by one:

1. The app kept crashing in Docker with a syntax error.
My code had backticks nested inside each other – one big template for the whole HTML page, and inside it, another script also using backticks. When I tried to fix one small error, I accidentally removed escaping that was needed for the nested one, which broke the whole file. I had to go back into the code and carefully check which backticks needed a backslash in front of them and which ones didn't.

2. The container was running but I couldn't open the website.
Docker showed it was up and running, and even testing it directly on the server worked fine. But my browser still couldn't load it. Turned out my AWS EC2 Security Group wasn't letting outside traffic in on port 3000. I had to go into AWS and manually add a rule to open that port.

3. I got confused between public IP and private IP.
I was trying to use the instance's private IP to access it from my browser, which doesn't work – that only works for things talking to each other inside AWS. I had to use the public IP instead to actually reach it from outside.

Screenshots

Docker build:
<img width="1024" height="449" alt="original1" src="https://github.com/user-attachments/assets/4eecbd3a-0dc5-455f-8b34-3aafd25682ee" />

Docker Hub image:
<img width="1023" height="765" alt="original2" src="https://github.com/user-attachments/assets/408e6d7e-3486-404c-a8fb-f6c891d73e3d" />

Running container:
<img width="1023" height="125" alt="original3" src="https://github.com/user-attachments/assets/4500dd19-be7e-46f4-a73e-3eb0478b363c" />

Live:
<img width="1016" height="753" alt="original4" src="https://github.com/user-attachments/assets/51594ea7-77d3-4894-9513-b3ce84612d96" />



Running container:
