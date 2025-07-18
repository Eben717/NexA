import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './frontend/SideBar/Dashboard/Dashboard';
import NavBar from './frontend/NavBar/NavBar';
import LoginPage from './frontend/LoginPage';
import SideBar from './frontend/SideBar/SideBar';
import Projects from './frontend/SideBar/Projects/Projects';
import Reports from './frontend/SideBar/Reports/reports';
import ProfilePage from './frontend/NavBar/ProfilePage';
import Logout from './frontend/NavBar/Logout';
import Settings from './frontend/NavBar/Settings';
import Library from './frontend/SideBar/Library/Library';
import AllProjects from './frontend/SideBar/Projects/AllProjects';
import Completed from './frontend/SideBar/Projects/Completed';
import Inprogress from './frontend/SideBar/Projects/InProgress';
import NotCompleted from './frontend/SideBar/Projects/NotCompleted';
import CompletedReports from './frontend/SideBar/Reports/completedreports';
import InprogressReports from './frontend/SideBar/Reports/inprogressreports';
import DueReports from './frontend/SideBar/Reports/duereport';
import ReportsList from './frontend/SideBar/Reports/reportslist';
import './app.css';

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
