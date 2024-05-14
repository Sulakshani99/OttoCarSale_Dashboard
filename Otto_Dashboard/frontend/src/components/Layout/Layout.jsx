// import React from "react";
// import Router from "../../routes/Router";
// import Sidebar from "../Sidebar/Sidebar";
// import TopNav from "../TopNav/TopNav";
// import React, { Fragment } from "react";

// const Layout = () => {
//   return (
//     <Fragment>
//     <div className="layout">
//       <Sidebar />
//       <div className="main__layout">
//         <TopNav />

//         <div className="content">
//           <Router />
//         </div>
//       </div>
//     </div>
//     </Fragment>
//   );
// };

// export default Layout;

import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Router from "../../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";
import Login from "../../pages/Login";
import ResetPassword from "../../pages/ResetPassword";
import ForgetPassword from "../../pages/ForgetPassword";

const Layout = () => {
  const location = useLocation();

  // Check if the current route path matches '/user', '/forget', or '/resetpassword'
  const transparentRoutes = ['/user', '/forget', '/resetpassword'].includes(location.pathname);

  return (
    <Fragment>
      <div className="layout">
        {!transparentRoutes && <Sidebar />}
        <div className="main__layout">
          {!transparentRoutes && <TopNav />}

          <div className="content">
            <Router />
            {location.pathname === "/user" }
            {location.pathname === "/forget" }
            {location.pathname === "/resetpassword/:id/:token" && <ResetPassword />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;


// import React from "react";
// import { useLocation } from "react-router-dom";
// import Router from "../../routes/Router";
// import Sidebar from "../Sidebar/Sidebar";
// import TopNav from "../TopNav/TopNav";
// import Login from "../../pages/Login"; // Import the Login component
// import { Fragment } from "react";
// import CommonSection from "../UI/CommonSection";
// import Helmet from "../Helmet/Helmet";

// const Layout = () => {
//   const location = useLocation();

//   // Check if the current route path is '/user'
//   const isUserRoute = location.pathname === "/user";

//   return (
//     <Fragment>
//       <div className="layout">
//         {!isUserRoute && <Sidebar />}
//         <div className="main__layout">
//           {!isUserRoute && <TopNav />}


//           <div className="content">
//             {/* Render the Login component only if the route path is '/user' */}
//             {isUserRoute ? <Login /> : <Router />}
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Layout;



// import React, { Fragment } from "react";
// import { useLocation } from "react-router-dom";
// import Router from "../../routes/Router";
// import Sidebar from "../Sidebar/Sidebar";
// import TopNav from "../TopNav/TopNav";
// import Footer from "../Footer/Footer"

// const Layout = () => {
//   const location = useLocation();

//   // Check if the current location matches the ResetPassword route
//   const isResetPassword = location.pathname === "/resetpassword/:id/:token";

//   return (
//     <Fragment>
//       {/* Only render Sidebar and TopNav if not on ResetPassword page */}
//       {!isResetPassword && (
//         <div className="layout">
//           <Sidebar />
//           <div className="main__layout">
//             <TopNav />
//             <div className="content">
//               <Router />
            
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Always render Router component */}
//       {isResetPassword && <Router />}

//       {/* <Footer/> */}
//     </Fragment>
//   );
// };

// export default Layout;


