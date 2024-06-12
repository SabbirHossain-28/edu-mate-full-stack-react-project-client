import { useMutation, useQuery } from "@tanstack/react-query";
// import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import Container from "../../../../Shared/Container/Container";
import { GrUserAdmin } from "react-icons/gr";
import Swal from "sweetalert2";
import Loading from "../../../../Shared/Loading/Loading";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  // const axiosCommon = useAxiosCommon();
  const axiosSecure = useAxiosSecure();
  const [loadingUserId, setLoadingUserId] = useState(null);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [count, setCount] = useState(0);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", currentPage, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?page=${currentPage}&size=${10}&search=${search}`
      );
      return res.data;
    },
  });

  const {
    data: count = 0,
    // refetch,
    // isLoading,
  } = useQuery({
    queryKey: ["count", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/countedUsers?search=${search}`);
      return res.data.result;
    },
  });

  console.log(count);

  const numberOfPages = Math.ceil(count / 10);
  const pages = [
    ...Array(numberOfPages)
      .keys()
      .map((key) => key + 1),
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
    setCurrentPage(1);
  };
  const handleCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/admin/${id}`);
      return res.data;
    },
  });

  const handleUserRole = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingUserId(id);
        await mutateAsync(id, {
          onSuccess: (data) => {
            if (data.modifiedCount) {
              Swal.fire({
                title: "Success",
                text: "User has been made an admin successfully.",
                icon: "success",
              });
              refetch();
            }
            setLoadingUserId(null);
          },
          onError: (error) => {
            console.error("Error updating user role:", error);
            Swal.fire({
              title: "Error",
              text: "There was an error making the user an admin.",
              icon: "error",
            });
            setLoadingUserId(null);
          },
        });
      }
    });
  };
  console.log(users);
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading></Loading>
      </div>
    );
  return (
    <div className="bg-slate-200 min-h-screen my-auto">
      <Container>
        <div className="pt-16">
          <div className="my-2">
            <div className="relative border-black dark:border-white border-2 p-2 rounded-lg">
              <form onSubmit={handleSearch}>
                <label htmlFor="Search" className="sr-only">
                  {" "}
                  Search{" "}
                </label>

                <input
                  type="text"
                  name="search"
                  id="Search"
                  placeholder="Search for..."
                  className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm px-3"
                />

                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                  <input
                    className="border mr-8 rounded-lg bg-green-500 text-white p-1"
                    type="submit"
                    value="search"
                  />
                </span>
              </form>
            </div>
          </div>
          <div className="overflow-x-auto bg-white border-2 border-black">
            <table className="table">
              <thead className="text-gray-500">
                <tr>
                  <th>User Image</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>User Role</th>
                  <th>Create Admin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {users.map((data, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={data?.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{data?.name}</td>
                    <td>{data?.email}</td>
                    <td>{data?.role}</td>
                    <td>
                      <button
                        onClick={() => handleUserRole(data?._id)}
                        className={`btn ${
                          data?.role === "Admin"
                            ? "bg-gray-400"
                            : "bg-base-orange"
                        } border-none btn-sm`}
                        disabled={
                          data?.role === "Admin" || loadingUserId === data?._id
                        }
                      >
                        {loadingUserId === data?._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <GrUserAdmin className="text-2xl text-white" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
              <li>
                <button
                  disabled={currentPage === 1}
                  onClick={() => handleCurrentPage(currentPage - 1)}
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>

              <li className="flex gap-2">
                {pages.map((page, idx) => (
                  <button
                    onClick={() => handleCurrentPage(page)}
                    key={idx}
                    className={`${
                      currentPage === page
                        ? "bg-[#5ad560] text-black dark:text-white"
                        : "bg-white text-gray-900 dark:text-white"
                    }block size-8 rounded border border-gray-100  text-center leading-8 `}
                  >
                    {page}
                  </button>
                ))}
              </li>

              <li>
                <button
                  disabled={currentPage === numberOfPages}
                  onClick={() => handleCurrentPage(currentPage + 1)}
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ol>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllUsers;
