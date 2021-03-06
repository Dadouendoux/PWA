import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { render } from "react-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, InfoCircleOutlined, FileOutlined, BarChartOutlined, TeamOutlined, UserOutlined, LoginOutlined, UsergroupAddOutlined, LogoutOutlined } from "@ant-design/icons";
import "./index.css";
import "antd/dist/antd.css";

import logo from './logo.png';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';

import Home from "./routes/home";
import AboutUs from "./routes/aboutUs";
import MyDrive from './routes/myDrive';
// import Rovers from "./routes/rovers";
// import RoverDetails from "./routes/roverDetails";
// import Missions from "./routes/missions";
// import MissionDetails from "./routes/missionDetails";
// import Users from "./routes/users";
// import UserDetails from "./routes/userDetails";
import Profile from "./routes/profile";
import Users from "./routes/users";
import UserDetails from "./routes/userDetails";
import AllInformation from "./routes/allInformation";
import Login from "./routes/login";
import Register from "./routes/register";
import Logout from "./routes/logout";
import NotFound from './routes/notFound';
import reportWebVitals from './reportWebVitals';

import { useCookies, CookiesProvider } from "react-cookie";

//pwa 
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const { Header, Content, Footer, Sider } = Layout;

const Router = () => {
  return (
    <div>
      <React.StrictMode>
        <BrowserRouter>
          <CookiesProvider>
            <Routes>
              <Route path='/' element={<Main />}>
                <Route path='/' element={<Home />} />
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path='/myDrive' element={<MyDrive />} />
                {/* <Route path='/rovers' element={<Rovers />} /> */}
                {/* <Route path='/roverDetails/:roverId' element={<RoverDetails />} /> */}
                {/* <Route path='/missions' element={<Missions />} /> */}
                {/* <Route path='/missionDetails/:missionId' element={<MissionDetails />} /> */}
                {/* <Route path='/users' element={<Users />} /> */}
                {/* <Route path='/userDetails/:userId' element={<UserDetails />} /> */}
                <Route path='/profile' element={<Profile />} />
                <Route path='/users' element={<Users />} />
                <Route path='/userDetails' element={<UserDetails />} />
                <Route path='/allInformation' element={<AllInformation />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/logout' element={<Logout />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </CookiesProvider>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  )
};

const Main = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setLoginStatus(true)
      const decoded = jwt_decode(token);
      if (decoded.isAdmin) {
        setAdminStatus(true)
      }
      // navigate('/my-drive')
    }
  }, [])

  if (loginStatus) {
    if (adminStatus) {
      return (
        <div>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider>
              <div className="logo">
                <img src={logo} />
              </div>
              <Menu id="menu" theme="dark" defaultSelectedKeys={[""]} mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                  <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<InfoCircleOutlined />}>
                  <Link to="/allInformation">All Information</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<LogoutOutlined />}>
                  <Link to="/logout">Logout</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0, textAlign: "center" }}>
                <h1 style={{ fontWeight: 900 }}>SupIdrive</h1>
              </Header>
              <Content style={{ margin: "0 16px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: "75vh", margin: "16px 0" }}>
                  <Outlet />
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                ??2022 - 3PROJ - SUPIDRIVE - SUPINFO PROJECT
              </Footer>
            </Layout>
          </Layout>
        </div>
      );
    } else {
      return (
        <div>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider>
              <div className="logo">
                <img src={logo} />
              </div>
              <Menu id="menu" theme="dark" defaultSelectedKeys={[""]} mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                  <Link to="/aboutUs">About us</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FileOutlined />}>
                  <Link to="/myDrive">My Drive</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />}>
                  <Link to="/profile">Profil</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<LogoutOutlined />}>
                  <Link to="/logout">Logout</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0, textAlign: "center" }}>
                <h1 style={{ fontWeight: 900 }}>SupIdrive</h1>
              </Header>
              <Content style={{ margin: "0 16px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: "75vh", margin: "16px 0" }}>
                  <Outlet />
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                ??2022 - 3PROJ - SUPIDRIVE - SUPINFO PROJECT
              </Footer>
            </Layout>
          </Layout>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider>
            <div className="logo">
              <img src={logo} />
            </div>
            <Menu id="menu" theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                <Link to="/aboutUs">About us</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UsergroupAddOutlined />}>
                <Link to="/register">Register</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0, textAlign: "center" }}>
              <h1 style={{ fontWeight: 900 }}>SupIdrive</h1>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: "75vh", margin: "16px 0" }}>
                <Outlet />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              ??2022 - 3PROJ - SUPIDRIVE - SUPINFO PROJECT
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
};

render(<Router />, document.querySelector("#router"));
render(<Main />, document.querySelector("#root"));

//pwa
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();