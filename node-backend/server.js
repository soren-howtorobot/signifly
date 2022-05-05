const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

const bodyParser = require("body-parser");

const { PrismaClient } = require("@prisma/client");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/get-teams", (req, res) => {
  const prismaQuery = async () => {
    const teams = await prisma.team.findMany();
    res.send({ teams });
  };
  prismaQuery()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

app.post("/create-game", (req, res) => {
  const prismaQuery = async () => {
    const game = await prisma.game.create({
      data: {
        team_1: req.body.team_1.id,
        team_2: req.body.team_2.id,
        score: {
          team_1: 0,
          team_2: 0,
        },
      },
    });
    res.send({ game });
  };
  prismaQuery()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});

app.get("/get-games", (req, res) => {
  const prismaQuery = async () => {
    const games = await prisma.game.findMany();
    res.send({ games });
  };
  prismaQuery()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});
app.get("/get-games/:id", (req, res) => {
  const prismaQuery = async () => {
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.send({ game });
  };
  prismaQuery()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
});


const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.put("/get-games/:id", (req, res) => {
  const prismaQuery = async () => {
    const game = await prisma.game.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        id: req.body.game.id,
        team_1: req.body.game.team_1,
        team_2: req.body.game.team_2,
        score: req.body.game.score
      },
    });
    res.send({ game });
  };
  prismaQuery()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

    //
});


server.listen(8025, () => {
  console.log("listening on *:8025");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
