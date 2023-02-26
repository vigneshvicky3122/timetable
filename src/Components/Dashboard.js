import axios from "axios";
import React, { useEffect, useState } from "react";
import Navi from "./Navi";
import { url } from "../App";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  let navigate = useNavigate();
  const [Data, setData] = useState([]);
  // {
  //   year: "I year CSE",
  //   division: "division A",
  //   room_no: "109",
  //   subjectDetails: [
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //       mentorName: "hiii",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //       mentorName: "",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //       mentorName: "",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //       mentorName: "",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //       mentorName: "",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //       mentorName: "",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //       mentorName: "",
  //     },
  //     {
  //       subjectId: "FSIP-4A",
  //       subjectName: "Foundation Skills in Integrated Product",
  //       mentorName: "",
  //     },
  //   ],
  //   timetable: [
  //     {
  //       day: "Monday",
  //       periods: ["C++", "C++", "C++", "C++", "C++", "C++", "C++", "C++"],
  //     },
  //     {
  //       day: "tuesday",
  //       periods: ["C++", "C++", "C++", "C++", "C++", "C++", "C++", "C++"],
  //     },
  // {
  //   day: "Tuesday",
  //   periods: {
  //     period1: "C++",
  //     period2: "C++",
  //     period3: "C++",
  //     period4: "C++",
  //     period5: "C++",
  //     period6: "C++",
  //     period7: "C++",
  //     period8: "C++",
  //   },
  // },
  // {
  //   day: "Wednesday",
  //   periods: {
  //     period1: "C++",
  //     period2: "C++",
  //     period3: "C++",
  //     period4: "C++",
  //     period5: "C++",
  //     period6: "C++",
  //     period7: "C++",
  //     period8: "C++",
  //   },
  // },
  // {
  //   day: "Thursday",
  //   periods: {
  //     period1: "C++",
  //     period2: "C++",
  //     period3: "C++",
  //     period4: "C++",
  //     period5: "C++",
  //     period6: "C++",
  //     period7: "C++",
  //     period8: "C++",
  //   },
  // },
  // {
  //   day: "Friday",
  //   periods: {
  //     period1: "C++",
  //     period2: "C++",
  //     period3: "C++",
  //     period4: "C++",
  //     period5: "C++",
  //     period6: "C++",
  //     period7: "C++",
  //     period8: "C++",
  //   },
  // },
  //   ],
  // },
  // ]);
  const [Department, setDepartment] = useState("select Department");
  const [Division, setDivision] = useState("select Division");
  const [Active, setActive] = useState(true);
  useEffect(() => {
    if (Department === "select Department" || Division === "select Division") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [Department, Division]);

  async function getData() {
    try {
      let result = await axios.get(`${url}/timetable`, {
        headers: {
          year: Department,
          division: Division,
        },
      });
      if (result.data.statusCode === 200) {
        setData(result.data.tableData);
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

  return (
    <>
      <Navi />
      <select
        id="Department"
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
        id="Division"
        defaultValue="select Division"
        onChange={(e) => setDivision(e.target.value)}
      >
        <option value="select Division">select Division</option>
        <option value="Division A">Division A</option>
        <option value="Division B">Division B</option>
        <option value="Division C">Division C</option>
      </select>
      &nbsp;
      <button
        type="button"
        onClick={() => getData()}
        disabled={Active}
        className="btn btn-primary"
        id="getTimeTable"
      >
        Get TimeTable
      </button>
      <div className="container-div">
        <table className="table table-bordered table-striped">
          <thead>
            <tr className="text-center">
              <th scope="col">
                DAY/PERIOD
                <br />
                (TIME)
              </th>
              <th scope="col" className="table-head">
                1<br />
                (9:00-9:50)
              </th>
              <th scope="col" className="table-head">
                2<br />
                (9:50-10:40)
              </th>
              <th scope="col">
                Break
                <br />
                (10:40-11:00)
              </th>
              <th scope="col" className="table-head">
                3<br />
                (11:00-11:50)
              </th>
              <th scope="col" className="table-head">
                4<br />
                (11:50-12:40)
              </th>
              <th scope="col">
                Lunch
                <br />
                (12:40-1:40)
              </th>
              <th scope="col" className="table-head">
                5<br />
                (1:40-2:30)
              </th>
              <th scope="col" className="table-head">
                6<br />
                (2:30-3:20)
              </th>
              <th scope="col">
                Break
                <br />
                (3:20-3:35)
              </th>
              <th scope="col" className="table-head">
                7<br />
                (3:35-4:25)
              </th>
              <th scope="col" className="table-head">
                8<br />
                (4:25-4:55)
              </th>
            </tr>
          </thead>
          <tbody>
            {Data &&
              Data.map((elem, index) => {
                return (
                  <>
                    {elem.timetable.map((data) => {
                      return (
                        <>
                          <tr className="text-center" key={index}>
                            <th scope="row" className="days">
                              {data.day}
                            </th>
                            <th scope="row">{data.periods[0]}</th>
                            <th scope="row">{data.periods[1]}</th>

                            <th scope="row"></th>
                            <th scope="row">{data.periods[2]}</th>
                            <th scope="row">{data.periods[3]}</th>
                            <th scope="row"></th>
                            <th scope="row">{data.periods[4]}</th>
                            <th scope="row">{data.periods[5]}</th>
                            <th scope="row"></th>
                            <th scope="row">{data.periods[6]}</th>
                            <th scope="row">{data.periods[7]}</th>
                          </tr>
                        </>
                      );
                    })}
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="container-div">
        <table className="table table-bordered table-striped">
          <thead>
            <tr className="text-center">
              <th scope="col">No.of.count</th>
              <th scope="col" className="table-head">
                SubjectId
              </th>
              <th scope="col" className="table-head">
                SubjectName
              </th>
              <th scope="col" className="table-head">
                Periods
              </th>
              <th scope="col" className="table-head">
                Faculty
              </th>
            </tr>
          </thead>
          <tbody>
            {Data &&
              Data.map((elem) => {
                return (
                  <>
                    {elem.subjectDetails.map((data, i) => {
                      return (
                        <>
                          <tr className="text-center" key={i}>
                            <th scope="row" className="days">
                              {i + 1}
                            </th>
                            <th scope="row">{data.subjectId}</th>
                            <th scope="row">{data.subjectName}</th>
                            <th scope="row">{}</th>
                            <th scope="row">{data.mentorName}</th>
                          </tr>
                        </>
                      );
                    })}
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
