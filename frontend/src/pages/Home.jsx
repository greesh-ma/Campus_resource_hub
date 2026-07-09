

// import { useState } from 'react';
// import ResourceList from '../components/ResourceList';

// function Home() {
//   const [sortType, setSortType] = useState("trending");

//   return (
//     <div className="page">
//       <div className="page-content">
//         <div className="container">
//           <h1 style={{ marginBottom: '20px' }}>Campus Resources</h1>

//           {/* 🔥 Tabs instead of dropdown */}
//           <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//             <button
//               onClick={() => setSortType("trending")}
//               className={sortType === "trending" ? "active-tab" : "tab"}
//             >
//               🔥 Trending
//             </button>

//             <button
//               onClick={() => setSortType("newest")}
//               className={sortType === "newest" ? "active-tab" : "tab"}
//             >
//               🆕 Newest
//             </button>

//             <button
//               onClick={() => setSortType("mostVoted")}
//               className={sortType === "mostVoted" ? "active-tab" : "tab"}
//             >
//               👍 Most Voted
//             </button>
//           </div>

//           <ResourceList sortType={sortType} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import { useState } from 'react';
import ResourceList from '../components/ResourceList';

function Home() {
  const [sortType, setSortType] = useState("trending");
  const [subject, setSubject] = useState("ALL"); // ✅ subject state

  return (
    <div className="page">
      <div className="page-content">
        <div className="container">
          <h1 style={{ marginBottom: '20px' }}>Campus Resources</h1>

          {/* 🔥 Sorting Tabs */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={() => setSortType("trending")}
              className={sortType === "trending" ? "active-tab" : "tab"}
            >
              🔥 Trending
            </button>

            <button
              onClick={() => setSortType("newest")}
              className={sortType === "newest" ? "active-tab" : "tab"}
            >
              🆕 Newest
            </button>

            <button
              onClick={() => setSortType("mostVoted")}
              className={sortType === "mostVoted" ? "active-tab" : "tab"}
            >
              👍 Most Voted
            </button>
          </div>

          {/* 📚 Subject Filter Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}
          >
            <button
              onClick={() => setSubject("ALL")}
              className={subject === "ALL" ? "active-tab" : "tab"}
            >
              All
            </button>

            <button
              onClick={() => setSubject("CSE3006")}
              className={subject === "CSE3006" ? "active-tab" : "tab"}
            >
              Database Management System
            </button>

            <button
              onClick={() => setSubject("CSE2001")}
              className={subject === "CSE2001" ? "active-tab" : "tab"}
            >
              Data Structures
            </button>

            <button
              onClick={() => setSubject("CSE3005")}
              className={subject === "CSE3005" ? "active-tab" : "tab"}
            >
              Operating Systems
            </button>

            <button
              onClick={() => setSubject("CSE3004")}
              className={subject === "CSE3004" ? "active-tab" : "tab"}
            >
              Computer Networks
            </button>

            <button
              onClick={() => setSubject("CSE4003")}
              className={subject === "CSE4003" ? "active-tab" : "tab"}
            >
              Machine Learning
            </button>

            <button
              onClick={() => setSubject("CSE4001")}
              className={subject === "CSE4001" ? "active-tab" : "tab"}
            >
              Artificial Intelligence
            </button>

            <button
              onClick={() => setSubject("CSE2006")}
              className={subject === "CSE2006" ? "active-tab" : "tab"}
            >
              Web Development
            </button>

            <button
              onClick={() => setSubject("CSE3001")}
              className={subject === "CSE3001" ? "active-tab" : "tab"}
            >
              Software Engineering
            </button>

            <button
              onClick={() => setSubject("CSE4002")}
              className={subject === "CSE4002" ? "active-tab" : "tab"}
            >
              Cloud Computing
            </button>

            <button
              onClick={() => setSubject("CSE4005")}
              className={subject === "CSE4005" ? "active-tab" : "tab"}
            >
              Cyber Security
            </button>

            <button
              onClick={() => setSubject("OTHER")}
              className={subject === "OTHER" ? "active-tab" : "tab"}
            >
              Other
            </button>
          </div>

          {/* 📦 Resource List */}
          <ResourceList sortType={sortType} subject={subject} />
        </div>
      </div>
    </div>
  );
}

export default Home;