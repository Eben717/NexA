import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/SideBar/Dashboard';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/LoginPage';
import SideBar from './components/SideBar/SideBar';
import Projects from './components/SideBar/Projects';
import Reports from './components/SideBar/reports';
import ProfilePage from './components/NavBar/ProfilePage';
import Logout from './components/NavBar/Logout';
import Settings from './components/NavBar/Settings';
import Library from './components/SideBar/Library';
import AllProjects from './components/SideBar/AllProjects';
import Completed from './components/SideBar/Completed';
import Inprogress from './components/SideBar/InProgress';
import NotCompleted from './components/SideBar/NotCompleted';
import CompletedReports from './components/SideBar/completedreports';
import InprogressReports from './components/SideBar/inprogressreports';
import DueReports from './components/SideBar/duereport';
import ReportsList from './components/SideBar/reportslist';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Route: Login Page */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <LoginPage setIsAuthenticated={setIsAuthenticated} />
                            )
                        }
                    />

                    {/* Protected Routes: Show layout + pages */}
                    {isAuthenticated && (
                        <>
                            <Route
                                path="*"
                                element={
                                    <>
                                        <NavBar />
                                        <SideBar />
                                        <Routes>
                                            <Route path="/dashboard" element={<Dashboard />} />
                                            <Route path="/projects" element={<Projects />} />
                                            <Route path="/reports" element={<Reports />} />
                                            <Route path="/library" element={<Library />} />
                                            <Route path="/profile" element={<ProfilePage />} />
                                            <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
                                            <Route path="/settings" element={<Settings />} />
                                            <Route path="/all-projects" element={<AllProjects />} />
                                            <Route path="/completed" element={<Completed />} />
                                            <Route path="/in-progress" element={<Inprogress />} />
                                            <Route path="/not-completed" element={<NotCompleted />} />
                                            <Route path="/completed-reports" element={<CompletedReports />} />
                                            <Route path="/in-progress-reports" element={<InprogressReports />} />
                                            <Route path="/due-reports" element={<DueReports />} />
                                            <Route path="/reports-list" element={<ReportsList />} />
                                        </Routes>
                                    </>
                                }
                            />
                        </>
                    )}

                    {/* Catch-all route: Redirect to login */}
                    {!isAuthenticated && (
                        <Route path="*" element={<Navigate to="/" />} />
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
