import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    if (
      form.site.length <= 3 ||
      form.username.length <= 3 ||
      form.password.length <= 3
    ) {
      toast.error("Fill proper credentials!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
      toast.success("Password saved successfully!!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    if (ref.current.src.includes("/eye-cross.png")) {
      ref.current.src = "/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eye-cross.png";
      passwordRef.current.type = "text";
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    toast("You are editing the credentials", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deletePassword = (id) => {
    let c = confirm("Are you sure you want to delete?");
    if (c) {
      const newPasswords = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(newPasswords);
      localStorage.setItem("passwords", JSON.stringify(newPasswords));
      toast.error("Password Deleted!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 overflow-x-hidden">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="md:cont">
        {/* Header */}
        <div className="hero-text text-center my-4">
          <h1 className="flex justify-center items-center drop-shadow-2xl text-3xl sm:text-4xl font-bold text-green-400 font-mono relative">
            &lt;Pass<span className="text-black">MAN/</span>&gt;
          </h1>
          <h3 className="text-sm sm:text-base">
            {"< Save Your Passwords, Save Your Day!! />"}
          </h3>
        </div>

        {/* Form Section */}
        <div className="main my-10 space-y-6">
          <div className="url flex flex-col justify-center items-center">
            <input
              value={form.site}
              onChange={handleChange}
              name="site"
              className="w-11/12 sm:w-2/3 p-2 rounded-full border-2 border-green-700 text-gray-600 font-bold focus:outline-none"
              placeholder="Website URL.."
            />
          </div>

          <div className="url2 flex flex-col sm:flex-row justify-center items-center">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              className="w-11/12 sm:w-auto m-2 p-2 rounded-full border-2 border-green-700 text-gray-600 font-bold focus:outline-none"
              placeholder="Username"
            />

            <div className="relative w-11/12 sm:w-auto m-2">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                name="password"
                type="password"
                className="w-full p-2 pr-10 rounded-full border-2 border-green-700 text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Password"
              />
              <img
                src="/eye.png"
                alt="Show password"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 cursor-pointer"
                ref={ref}
                onClick={showPassword}
              />
            </div>
          </div>

          <div className="btn flex justify-center items-center">
            <button
              onClick={savePassword}
              className="bg-green-600 hover:bg-green-700 transition rounded-md px-3 py-2 flex justify-center items-center cursor-pointer"
            >
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"
              ></lord-icon>
              <span className="font-bold text-white">Save!</span>
            </button>
          </div>
        </div>

        {/* Passwords Section */}
        <div className="passwords flex flex-col justify-center items-center">
          <div className="text-pass text-center">
            <h2 className="font-bold text-2xl">
              <span className="text-green-600">&lt;</span>Your Pass
              <span className="text-green-500">Words</span>
              <span className="text-green-600">/&gt;</span>
            </h2>
          </div>

          {passwordArray.length === 0 && (
            <div className="text-center">
              <span className="text-green-600">&lt;</span> No Passwords To Show
              <span className="text-green-600">/&gt;</span>
            </div>
          )}

          {passwordArray.length !== 0 && (
            <div className="w-full overflow-x-auto">
              <table className="table-auto my-9 border border-green-600 rounded-md w-full text-sm sm:text-base">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 border border-green-600">Site</th>
                    <th className="px-2 sm:px-4 py-2 border border-green-600">Username</th>
                    <th className="px-2 sm:px-4 py-2 border border-green-600">Password</th>
                    <th className="px-2 sm:px-4 py-2 border border-green-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center border border-green-600 p-2 break-all">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-800 underline hover:text-blue-600 transition"
                          >
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer hover:scale-110 transition"
                            title="Copy website URL"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="text-center border border-green-600 p-2 break-all">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-800">{item.username}</span>
                          <div
                            className="cursor-pointer hover:scale-110 transition"
                            title="Copy username"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="text-center border border-green-600 p-2 break-all">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-800">{"*".repeat(item.password.length)}</span>
                          <div
                            className="cursor-pointer hover:scale-110 transition"
                            title="Copy password"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="text-center border border-green-600 p-2">
                        <div className="flex items-center justify-center gap-4 sm:gap-6">
                          <div
                            onClick={() => editPassword(item.id)}
                            className="cursor-pointer hover:scale-110 transition"
                            title="Edit"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/mudwpdhy.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </div>
                          <div
                            onClick={() => deletePassword(item.id)}
                            className="cursor-pointer hover:scale-110 transition"
                            title="Delete"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/oqeixref.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
