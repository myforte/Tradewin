import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import HeadersHeading from "@vb/widgets/Headers/Heading";
import HeadersCardHeader from "@vb/widgets/Headers/CardHeader";

import WidgetsCharts11 from "@vb/widgets/WidgetsCharts/11";
import WidgetsCharts11v1 from "@vb/widgets/WidgetsCharts/11v1";
import WidgetsCharts11v2 from "@vb/widgets/WidgetsCharts/11v2";
import WidgetsCharts4 from "@vb/widgets/WidgetsCharts/4";
import WidgetsCharts4v1 from "@vb/widgets/WidgetsCharts/4v1";
import WidgetsCharts4v2 from "@vb/widgets/WidgetsCharts/4v2";
import HeadersHeading2 from "@vb/widgets/Headers/Heading2";
import TablesAntd3 from "@vb/widgets/TablesAntd/3";
import HeadersHeading3 from "@vb/widgets/Headers/Heading3";
import WidgetsGeneral17 from "@vb/widgets/WidgetsGeneral/17";
import WidgetsGeneral17v1 from "@vb/widgets/WidgetsGeneral/17v1";
import WidgetsGeneral17v2 from "@vb/widgets/WidgetsGeneral/17v2";
import WidgetsGeneral5 from "@vb/widgets/WidgetsGeneral/5";
import WidgetsGeneral6v1 from "@vb/widgets/WidgetsGeneral/6v1";
import WidgetsGeneral6 from "@vb/widgets/WidgetsGeneral/6";
import { useDispatch } from "react-redux";
import { Table } from "reactstrap";
import { store } from "../../../index";

// import { getNifty500Data } from "../../../services/firebase";

const DashboardAlpha = () => {
  const dispatch = useDispatch();
  let data;
  const [nifty500Data, setNifty500Data] = useState(null);
  store.subscribe(() => {
    data = store.getState().nifty500;
    setNifty500Data(data.data);
  });
  const loadData = () => {
    dispatch({
      type: "nifty500/LOAD_DATA",
      payload: { loading: false },
    });
    data = store.getState().nifty500;
  };

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    console.log("Nifty Data:", nifty500Data);
  }, [nifty500Data]);
  return (
    <div>
      <Helmet title="Dashboard Alpha" />
      <div className="card">
        <div className="card-header">
          <HeadersCardHeader data={{ title: "Nifty 500" }} />
        </div>
        <div className="card-body">
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>Average</th>
                  <th>Max</th>
                  <th>Min</th>
                  <th>Symbol</th>
                </tr>
              </thead>
              <tbody>
                {nifty500Data &&
                  nifty500Data.map((item) => {
                    return (
                      <tr key={item.key}>
                        <th scope="row">{Number(item.key) + 1}</th>
                        <td>{item.data.name}</td>
                        <td>{item.data.avg}</td>
                        <td>{item.data.max}</td>
                        <td>{item.data.min}</td>
                        <td>{item.data.symbol}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: "Last Month Statistics" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsCharts11 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsCharts11v1 />
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <WidgetsCharts11v2 />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading data={{ title: "Today Statistics" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4v1 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsCharts4v2 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <HeadersHeading2
                data={{
                  title: "Recently Referrals",
                  description:
                    "Block with important Recently Referrals information",
                }}
              />
            </div>
            <div className="card-body">
              <TablesAntd3 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: "Your Cards (3)",
                  button: "View All",
                  url: "https://google.com",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral17 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral17v1 />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral17v2 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: "Your accounts",
                  button: "View All",
                  url: "https://google.com",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral5 />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="card">
            <div className="card-body">
              <WidgetsGeneral5 />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-placeholder">
            <div className="card-header">
              <HeadersHeading3
                data={{
                  title: "Recent Transactions",
                  button: "View All",
                  url: "https://google.com",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <WidgetsGeneral6v1 />
          </div>
          <div className="card">
            <WidgetsGeneral6 />
          </div>
          <div className="card">
            <WidgetsGeneral6v1 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAlpha;
