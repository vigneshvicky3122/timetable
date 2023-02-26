import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import Navi from "./Navi";
import { useFormik } from "formik";
import * as yup from "yup";

function Admin() {
  let navigate = useNavigate();
  const [Department, setDepartment] = useState("select Department");
  const [Division, setDivision] = useState("select Division");
  const [Day, setDay] = useState("select Day");
  const [Period, setPeriod] = useState("select Period");
  const [SubjectId, setSubjectId] = useState("Subject Id");
  const [Active, setActive] = useState(true);
  const [ActiveAdd, setActiveAdd] = useState(true);
  const [Data, setData] = useState([]);
  const [Mentor, setMentor] = useState([]);
  useEffect(() => {
    if (
      Department === "select Department" ||
      Division === "select Division" ||
      Day === "select Day" ||
      Period === "select Period" ||
      SubjectId === "Subject Id"
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
    if (
      formik.values.name === "Mark Reich A" ||
      formik.values.subject === "xxx,xxx,xxx" ||
      formik.values.email === "email123@gmail.com" ||
      formik.values.password === "ac5vev@1"
    ) {
      setActiveAdd(true);
    } else {
      setActiveAdd(false);
    }
  }, [Department, Division, Day, Period, SubjectId]);
  let getData = async () => {
    try {
      let result = await axios.get(`${url}/getData`, {});
      if (result.data.statusCode === 200) {
        setData(result.data.subject);
        setMentor(result.data.mentor);
        assignData();
      }
      if (result.data.statusCode === 400) {
        navigate("/login");
      }
      if (result.data.statusCode === 404) {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  function assignData() {
    // const final = [];

    // function mentor(params) {
    // for (let index = 0; index < Mentor.length; index++) {
    //   let sub = Mentor[index].subjects;
    //   for (let index = 0; index < sub.length; index++) {
    //     var elem = sub[index].subjectName;
    //   }
    // console.log(subj);
    // }
    // for (let i = 0; i < Data.length; i++) {
    //   var element = Data[i].subjectDetails;

    // for (let j = 0; j < element.length; j++) {
    //   let res = element[j].subjectName === sub[index].subjectName;
    //   if (res === true) {
    //     subj.push({
    //       mentorName: Mentor[index].name,
    //       year: Data[i].year,
    //       division: Data[i].division,
    //     });
    //   }
    // }
    // let periods = [
    //   "PRI-4A",
    //   "FSI-4A",
    //   "PR3-4A",
    //   "ICD-4A",
    //   "PR2-4A",
    //   "SEM-4A",
    //   "LIB-4A",
    //   "TWM",
    //   "PR4-4A",
    // ];

    // let Alter = [];
    // let tuesday = [];
    // let wednesday = [];
    // let thursday = [];
    // let friday = [];
    // let year = [{ year: "I year CSE", division: "Division A" }];
    //   for (let index = 0; index < 2; index++) {
    //     getData();
    //   }
    // }
    // let final [];
    let Mentors = [
      [
        { Mname: "jeeva", suBID: "dfdcsd" },
        "prasad",
        "dfvhru",
        "duhvfh",
        "dbvfuh",
        "wdjfhuerh",
        "fnjiri",
        "fnrji",
      ],
      ["jeeva", "prasad", "dfvhru", "duhvfh", "dbvfuh", "wdjfhuerh"],
      ["jeeva", "prasad", "dfvhru", "duhvfh", "dbvfuh", "wdjfhuerh"],
    ];
    let monday = [];
    let total = [];

    let subj = [
      "c",
      "c++",
      "js",
      "node",
      "express",
      "Foundation Skills in Integrated Product",
    ];
    for (let index = 0; index < Mentor.length; index++) {
      const element = Mentor[index].subjects;
      for (let j = 0; j < element.length; j++) {
        let secA = [];
        const elem = element[j].subjectName;
        let cal = subj.includes(elem);
        if (cal) {
          secA.push({
            mentorName: Mentor[index].name,
            subjectId: element[j].subjectName,
          });
          total.push(secA);
        }
      }
    }
    console.log(total);
    // let alters = [...arr];
    for (let index = 0; index < Mentors.length; index++) {
      let arr = [];
      for (let i = 0; i < 8; i++) {
        arr.push(
          Mentors[index][Math.floor(Math.random() * Mentors[index].length)]
        );
      }
      // monday.push(arr);
      // console.log(monday);
      // console.log(alters);
      // tuesday.push(periods[Math.floor(Math.random() * periods.length)]);
      // wednesday.push(periods[Math.floor(Math.random() * periods.length)]);
      // thursday.push(periods[Math.floor(Math.random() * periods.length)]);
      // friday.push(periods[Math.floor(Math.random() * periods.length)]);
    }
    // console.log(monday);
  }
  // console.log(element.filter((x) => x.subjectName === elem));

  // }

  // function subj(params) {
  // console.log(params);

  // mentor();
  // }

  // let periods = ["PRI-4A", "FSI-4A", "PR3-4A", "ICD-4A", "PR2-4A", "SEM-4A", "LIB-4A", "TWM", "PR4-4A"];
  // let monday = [];
  // let tuesday = [];
  // let wednesday = [];
  // let thursday = [];
  // let friday = [];

  // for (let i = 0; i < 8; i++) {
  //     monday.push(periods[Math.floor(Math.random() * periods.length)]);
  //     tuesday.push(periods[Math.floor(Math.random() * periods.length)]);
  //     wednesday.push(periods[Math.floor(Math.random() * periods.length)]);
  //     thursday.push(periods[Math.floor(Math.random() * periods.length)]);
  //     friday.push(periods[Math.floor(Math.random() * periods.length)]);
  // }
  // if (friday.length > 0) {
  // let data = {
  //   year: "I year CSE",
  //   division: "division A",
  //   room_no: "109",
  //   subjectDetails: [
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //     },
  //   ],
  //   timetable: [
  //     {
  //       day: "Monday",
  //       periods: {
  //         period1: "C++",
  //         period2: "C++",
  //         period3: "C++",
  //         period4: "C++",
  //         period5: "C++",
  //         period6: "C++",
  //         period7: "C++",
  //         period8: "C++",
  //       },
  //     },
  //     {
  //       day: "Tuesday",
  //       periods: {
  //         period1: "C++",
  //         period2: "C++",
  //         period3: "C++",
  //         period4: "C++",
  //         period5: "C++",
  //         period6: "C++",
  //         period7: "C++",
  //         period8: "C++",
  //       },
  //     },
  //     {
  //       day: "Wednesday",
  //       periods: {
  //         period1: "C++",
  //         period2: "C++",
  //         period3: "C++",
  //         period4: "C++",
  //         period5: "C++",
  //         period6: "C++",
  //         period7: "C++",
  //         period8: "C++",
  //       },
  //     },
  //     {
  //       day: "Friday",
  //       periods: {
  //         period1: "C++",
  //         period2: "C++",
  //         period3: "C++",
  //         period4: "C++",
  //         period5: "C++",
  //         period6: "C++",
  //         period7: "C++",
  //         period8: "C++",
  //       },
  //     },
  //     {
  //       day: "monday",
  //       periods: {
  //         period1: "C++",
  //         period2: "C++",
  //         period3: "C++",
  //         period4: "C++",
  //         period5: "C++",
  //         period6: "C++",
  //         period7: "C++",
  //         period8: "C++",
  //       },
  //     },
  //   ],
  // };
  const randomData = async () => {
    try {
      let result = await axios.put(
        `${url}/re-generate`,
        {},
        { headers: { Authorization: window.localStorage.getItem("app-token") } }
      );
      if (result.data.statusCode === 200) {
        alert(result.data.message);
      }
      if (result.data.statusCode === 400) {
        alert(result.data.message);
      }
      if (result.data.statusCode === 404) {
        alert(result.data.message);
      }
      if (result.data.statusCode === 500) {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };
  async function assign() {
    try {
      let result = await axios.put(
        `${url}/modified`,
        {
          Department,
          Division,
          Day,
          Period,
          SubjectId,
        },
        {
          headers: { Authorization: window.localStorage.getItem("app-token") },
        }
      );
      if (result.data.statusCode === 200) {
        alert(result.data.message);
      }
      if (result.data.statusCode === 400) {
        navigate("/login");
      }
      if (result.data.statusCode === 404) {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  let handleSubmit = async (data) => {
    try {
      let rest = await axios.post(`${url}/create-mentor`, data);
      if (rest.data.statusCode === 200) {
        window.alert(rest.data.message);
        window.location.reload();
      }
      if (rest.data.statusCode === 400) {
        window.confirm(rest.data.message);
        navigate("/login");
      }
      if (rest.data.statusCode === 404) {
        window.alert(rest.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "Mark Reich A",
      email: "email123'@'gmail.com",
      password: "ac5vev@1",
      subject: "xxx,xxx,xxx",
    },
    validationSchema: yup.object({
      name: yup.string().required("* Required"),
      email: yup.string().email("Enter a valid email").required("* Required"),
      password: yup
        .string()
        .max(8, "Min & Max character allowed is 2-8")
        .min(5, "Enter a secure password")
        .required("* Required"),
      subject: yup
        .string()
        .matches(
          /^[a-zA-Z0-9,]+$/,
          "* This field cannot contain white space and special character"
        )
        .required("* Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <>
      <Navi />
      <div className="sub-container">
        <form onSubmit={formik.handleSubmit} target="_blank">
          <div className="modifyElem row g-2 align-items-center">
            <h3>Add Mentor</h3>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="name">Subjects</label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subject}
              />
              {formik.touched.subject && formik.errors.subject ? (
                <div style={{ color: "red" }}>{formik.errors.subject}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="name">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="name">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
            </div>
            &nbsp;
            <button
              type="submit"
              disabled={ActiveAdd}
              className="btn btn-primary"
              id="getTimeTable"
            >
              Add
            </button>
          </div>
        </form>
        <form>
          <div className="modifyElem row g-2 align-items-center">
            <h3>Re-Assign Mentor</h3>
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              defaultValue="select Department"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="select Department">select Department</option>
              <option value="I year CSE">I year CSE</option>
              <option value="II year CSE">II year CSE</option>
              <option value="III year CSE">III year CSE</option>
              <option value="IV year CSE">IV year CSE</option>
            </select>
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              defaultValue="select Division"
              onChange={(e) => setDivision(e.target.value)}
            >
              <option value="select Division">select Division</option>
              <option value="Division A">Division A</option>
              <option value="Division B">Division B</option>
              <option value="Division C">Division C</option>
            </select>
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              defaultValue="select Day"
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="select Day">select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="friday">friday</option>
            </select>
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              defaultValue="select Period"
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="select Period">select Period</option>
              <option value="1">Period 1</option>
              <option value="2">Period 2</option>
              <option value="3">Period 3</option>
              <option value="4">Period 4</option>
              <option value="5">Period 5</option>
              <option value="6">Period 6</option>
              <option value="7">Period 7</option>
              <option value="8">Period 8</option>
            </select>
            <input
              className="form-control"
              type="text"
              placeholder="Subject Id"
              onChange={(e) => setSubjectId(e.target.value)}
              value={SubjectId}
            />
            &nbsp;
            <button
              type="button"
              onClick={() => assign()}
              disabled={Active}
              className="btn btn-primary"
              id="getTimeTable"
            >
              Get TimeTable
            </button>
          </div>
        </form>
        <form>
          <div className="modifyElem row g-2 align-items-center">
            <h3>Re-Assign Mentor</h3>
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              defaultValue="select Department"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="select Department">select Department</option>
              <option value="I year CSE">I year CSE</option>
              <option value="II year CSE">II year CSE</option>
              <option value="III year CSE">III year CSE</option>
              <option value="IV year CSE">IV year CSE</option>
            </select>
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              defaultValue="select Division"
              onChange={(e) => setDivision(e.target.value)}
            >
              <option value="select Division">select Division</option>
              <option value="Division A">Division A</option>
              <option value="Division B">Division B</option>
              <option value="Division C">Division C</option>
            </select>
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              defaultValue="select Day"
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="select Day">select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="friday">friday</option>
            </select>
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              defaultValue="select Period"
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="select Period">select Period</option>
              <option value="1">Period 1</option>
              <option value="2">Period 2</option>
              <option value="3">Period 3</option>
              <option value="4">Period 4</option>
              <option value="5">Period 5</option>
              <option value="6">Period 6</option>
              <option value="7">Period 7</option>
              <option value="8">Period 8</option>
            </select>
            <input
              className="form-control"
              type="text"
              placeholder="Subject Id"
              onChange={(e) => setSubjectId(e.target.value)}
              value={SubjectId}
            />
            &nbsp;
            <button
              type="button"
              onClick={() => assign()}
              disabled={Active}
              className="btn btn-primary"
              id="getTimeTable"
            >
              Get TimeTable
            </button>
          </div>
        </form>
        <div className="re-btn">
          <button
            onClick={() => getData()}
            className="btn btn-warning"
            type="button"
          >
            Re-Schedule TimeTable
          </button>
        </div>
      </div>
    </>
  );
}

export default Admin;
