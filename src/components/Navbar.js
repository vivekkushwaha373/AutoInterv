"use client"

import { useContext, useRef } from "react"
import logo from "../Assets/intervai.png"
import { useLocation, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Navbar = () => {
  const menu = useRef()
  const mobile = useRef()
  const location = useLocation()

  const { isLoggedIn, LogOut } = useContext(AppContext)
  const navigate = useNavigate()

  function logmein() {
    navigate("/login")
  }

  function interviewme() {
    navigate("/interformpage")
  }

  function signmeup() {
    navigate("/signup")
  }

  async function logmeout() {
    try {
      await LogOut()
      navigate("/")
    } catch (error) { }
  }

  function myprofile() {
    navigate("/dashboard")
  }

  function home() {
    navigate("/")
  }

  function chatmein() {
    navigate("/chatroom")
  }

  const toggleMobileMenu = () => {
    mobile.current.classList.toggle("translate-x-0")
    mobile.current.classList.toggle("translate-x-full")
    menu.current.classList.toggle("open")
  }

  return (
    <>
      {/* Main Navbar */}
      <nav className="w-full bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={home}>
              <div className="relative">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="InterVAI Logo"
                  className="h-10 w-10 object-contain drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm"></div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                  AUTO
                </span>
                <span className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-1">
                  Interv
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {location.pathname !== "/" && (
                <button
                  onClick={home}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Home
                </button>
              )}

              {!isLoggedIn && (
                <button
                  onClick={logmein}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Login
                </button>
              )}
              {!isLoggedIn && (
                <button
                  onClick={signmeup}
                  className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 ml-2 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                >
                  Sign Up
                </button>
              )}

              {isLoggedIn && (
                <>
                  <button
                    onClick={chatmein}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    Chatroom
                  </button>
                  <button
                    onClick={interviewme}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    AI Interview
                  </button>
                  <button
                    onClick={myprofile}
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={logmeout}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-200 ml-2 shadow-lg hover:shadow-red-500/25 hover:scale-105"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                ref={menu}
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
              >
                <span className="sr-only">Open main menu</span>
                <div className="hamburger-menu">
                  <span className="block w-6 h-0.5 bg-current transform transition-transform duration-200"></span>
                  <span className="block w-6 h-0.5 bg-current mt-1.5 transform transition-transform duration-200"></span>
                  <span className="block w-6 h-0.5 bg-current mt-1.5 transform transition-transform duration-200"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        ref={mobile}
        className="fixed top-16 right-0 w-full h-screen bg-slate-900/98 backdrop-blur-md shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out md:hidden z-40 border-l border-slate-700/50"
      >
        <div className="px-4 py-6 space-y-1">
          {location.pathname !== "/" && (
            <button
              onClick={() => {
                home()
                toggleMobileMenu()
              }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
            >
              Home
            </button>
          )}

          {!isLoggedIn && (
            <button
              onClick={() => {
                logmein()
                toggleMobileMenu()
              }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
            >
              Login
            </button>
          )}

          {isLoggedIn && (
            <>
              <button
                onClick={() => {
                  chatmein()
                  toggleMobileMenu()
                }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                Chatroom
              </button>
              <button
                onClick={() => {
                  interviewme()
                  toggleMobileMenu()
                }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                AI Interview
              </button>
              <button
                onClick={() => {
                  myprofile()
                  toggleMobileMenu()
                }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  logmeout()
                  toggleMobileMenu()
                }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-200 mt-4 shadow-lg"
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <button
              onClick={() => {
                signmeup()
                toggleMobileMenu()
              }}
              className="block w-full text-left px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-200 mt-4 shadow-lg"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30 opacity-0 pointer-events-none transition-opacity duration-300"
        onClick={toggleMobileMenu}
      ></div>
    </>
  )
}

export default Navbar