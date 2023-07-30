-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT,
    "profilePicture" TEXT,
    "birthday" DATE,
    "description" TEXT,
    "roles" TEXT NOT NULL,
    "sessionid" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "sources" TEXT NOT NULL,
    "dateCreated" DATE NOT NULL,
    "dateEdited" DATE,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dateCreated" DATE NOT NULL,
    "dateEdited" DATE,
    "dateCompleted" DATE,
    "priority" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
