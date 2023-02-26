const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const router = express();
const { hashPassword, hashCompare } = require("./hashPassword");
const { authentication, createToken } = require("./auth");
const { mailer } = require("./nodeMail");
const { MongoClient, ObjectId } = require("mongodb");
const Client = new MongoClient(process.env.DB_URL);
router.use(
  bodyParser.json({ limit: "50mb", extended: true, parameterLimit: 50000 }),
  cors({
    origin: "*",
    credentials: true,
  })
);

router.get("/timetable", async (req, res) => {
  await Client.connect();

  const Db = Client.db(process.env.DB_NAME);
  try {
    const tableData = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ year: req.headers.year, division: req.headers.division })
      .toArray();
    if (tableData) {
      res.json({
        statusCode: 200,
        tableData,
      });
    } else {
      res.json({
        statusCode: 404,
        message: "failed to find",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  } finally {
    await Client.close();
  }
});
router.get("/getData", async (req, res) => {
  await Client.connect();

  const Db = Client.db(process.env.DB_NAME);
  try {
    const subject = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find()
      .toArray();
    const mentor = await Db.collection(process.env.DB_COLLECTION_TWO)
      .find()
      .toArray();
    if (mentor) {
      res.json({
        statusCode: 200,
        subject,
        mentor,
      });
    } else {
      res.json({
        statusCode: 404,
        message: "failed to find",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  } finally {
    await Client.close();
  }
});
router.get("/mentor", async (req, res) => {
  await Client.connect();
  const Db = Client.db(process.env.DB_NAME);
  console.log(req.headers.subject_id);
  try {
    const tableData = await Db.collection(process.env.DB_COLLECTION_TWO)
      .find({
        subjectId: req.headers.subject_id,
      })
      .toArray();
    if (tableData) {
      res.json({
        statusCode: 200,
        tableData,
      });
    } else {
      res.json({
        statusCode: 404,
        message: "failed to find",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  } finally {
    await Client.close();
  }
});
router.put("/modified", async (req, res) => {
  await Client.connect();
  console.log(req.body);
  try {
    const Db = Client.db(process.env.DB_NAME);
    const result = await Db.collection(
      process.env.DB_COLLECTION_ONE
    ).findOneAndUpdate(
      { day: req.body.Day },
      { $set: { periods: { [req.body.Period]: req.body.SubjectId } } }
    );
    if (result) {
      res.json({ statusCode: 200, message: "Re-Assigned" });
    } else {
      res.json({ statusCode: 404, message: "retry" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  } finally {
    await Client.close();
  }
});
router.put("/re-generate", async (req, res) => {
  await Client.connect();

  try {
    const Db = Client.db(process.env.DB_NAME);
    const removeOldData = await Db.collection(
      process.env.DB_COLLECTION_ONE
    ).deleteMany();
    if (removeOldData) {
      const insertNewData = await Db.collection(
        process.env.DB_COLLECTION_ONE
      ).insertMany([
        { day: "Monday", periods: req.body.monday },
        { day: "Tuesday", periods: req.body.tuesday },
        { day: "Wednesday", periods: req.body.wednesday },
        { day: "Thursday", periods: req.body.thursday },
        { day: "Friday", periods: req.body.friday },
      ]);
      if (insertNewData) {
        res.json({ statusCode: 200, message: "Re-schedule successfully" });
      }
    } else {
      res.json({ statusCode: 404, message: "retry" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("internal error");
  } finally {
    await Client.close();
  }
});
router.post("/login", async (req, res) => {
  await Client.connect();

  try {
    const db = Client.db(process.env.DB_NAME);
    let user = await db
      .collection(process.env.DB_COLLECTION_TWO)
      .find({ email: req.body.email })
      .toArray();

    if (user.length === 1) {
      let hashResult = await hashCompare(req.body.password, user[0].password);

      if (hashResult) {
        res.json({
          statusCode: 200,
          message: "Login successful",
        });
      } else {
        res.json({
          statusCode: 404,
          message: "invalid credentials",
        });
      }
    } else {
      res.json({
        statusCode: 402,
        message: "User does not exist",
      });
    }
  } catch {
    res.json({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    await Client.close();
  }
});
router.post("/create-mentor", async (req, res) => {
  await Client.connect();
  try {
    const db = Client.db(process.env.DB_NAME);
    let users = await db
      .collection(process.env.DB_COLLECTION_TWO)
      .find({ email: req.body.email })
      .toArray();

    if (users.length === 0) {
      let hashedPassword = await hashPassword(req.body.password);

      if (hashedPassword) {
        let SubRandom = [];
        let splitSub = req.body.subject.split(",");

        if (splitSub.length >= 1) {
          for (let index = 0; index < splitSub.length; index++) {
            var chars = splitSub[index];
            var string_length = 6;
            var randomString = "";

            for (var i = 0; i < string_length; i++) {
              var rNum = Math.floor(Math.random() * chars.length);
              randomString += chars[rNum];
            }

            SubRandom.push({
              subjectName: splitSub[index],
              subjectId: randomString,
            });
          }

          if (SubRandom) {
            let user = await db
              .collection(process.env.DB_COLLECTION_TWO)
              .insertOne({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                subjects: SubRandom,
                timetable: [],
              });
            if (user) {
              res.json({
                statusCode: 200,
                message: "Added",
              });
            }
          }
        }
      } else {
        res.json({
          statusCode: 404,
          message: "password not found",
        });
      }
    } else {
      res.json({
        statusCode: 401,
        message: "User was already exist, please Login...",
      });
    }
  } catch (error) {
    res.json({
      statusCode: 500,
      message: "Internal server error",
    });
  } finally {
    await Client.close();
  }
});
router.post("/reset-email-verify", async (req, res) => {
  await Client.connect();
  try {
    const db = Client.db(process.env.DB_NAME);

    let user = await db
      .collection(process.env.DB_COLLECTION_TWO)
      .find({ email: req.body.email })
      .toArray();
    if (user.length === 1) {
      let digits = "123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 9)];
      }
      if (OTP) {
        let saveOtp = await db
          .collection(process.env.DB_COLLECTION_TWO)
          .findOneAndUpdate(
            { _id: new ObjectId(user[0]._id) },
            { $push: { otp: OTP } }
          );
        if (saveOtp) {
          await mailer(req.body.email, OTP);

          res.json({
            statusCode: 200,
            message: "OTP has sent successful",
          });
        } else {
          res.json({
            statusCode: 402,
            message: "Otp generation failed",
          });
        }
      } else {
        res.json({
          statusCode: 403,
          message: "Otp generation failed",
        });
      }
    } else {
      res.json({
        statusCode: 404,
        message: "User does not exist, Do register...",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
router.post("/reset-otp-verify", async (req, res) => {
  await Client.connect();
  try {
    const db = Client.db(process.env.DB_NAME);
    let user = await db
      .collection(process.env.DB_COLLECTION_TWO)
      .find({ email: req.body.user })
      .toArray();
    if (user) {
      let verify = user[0].otp.includes(req.body.data.otp);
      if (verify) {
        res.json({
          statusCode: 200,
          message: "Verification successful. Wait...",
          userId: user[0]._id,
        });
      } else {
        res.json({
          statusCode: 401,
          message: "invalid Otp",
        });
      }
    } else {
      res.json({
        statusCode: 402,
        message: "User does not exist",
      });
    }
  } catch {
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
router.put("/password-reset/:id", async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let users = await Db.collection(process.env.DB_COLLECTION_TWO)
      .find({ _id: new ObjectId(req.params.id) })
      .toArray();
    if (users) {
      if (req.body.password === req.body.confirmPassword) {
        let hashpassword = await hashPassword(req.body.password);

        if (hashpassword) {
          let update = await Db.collection(
            process.env.DB_COLLECTION_TWO
          ).findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: { password: hashpassword } }
          );
          if (update) {
            res.json({
              statusCode: 200,
              message: "Password changed successfully",
            });
          }
        }
      } else {
        res.json({
          statusCode: 403,
          message: "Details does not match",
        });
      }
    } else {
      res.json({
        statusCode: 404,
        message: "User does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
router.listen(PORT, () => {
  console.log("Server running into port " + PORT);
});
