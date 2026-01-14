

export async function addStudent(token: string, payload: { fullName: string, email: string, grade: string, status: string }) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create-student`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed to ");
    return resData;
}


export async function editFaq(token: string, payload: { title: string, description: string, }, id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/faq/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: payload.title,
            description: payload.description,
        }),
    });

    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Failed to ");
    return resData;
}

export async function getAllStudents({ page, limit, year, search, token }: { page?: number; limit?: number, year?: string, search?: string, token?: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/all-user?role=student&page=${page}&limit=${limit}&year=${year}&searchTerm=${search}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    const resData: StudentApiResponse = await response.json()
    if (!response.ok) {
        throw new Error(resData.message || "Failed to get students")
    }
    return resData
}

// export async function getSingelFaq(id:string) {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/faq/${id}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   const resData: SingleFaqResponse = await response.json()
//   if (!response.ok) {
//     throw new Error(resData.message || "Failed to get blog data")
//   }
//   return resData
// }

export async function deleteStudent(token: string, id: string,) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resData = await response.json();
  if (!response.ok) throw new Error(resData.message || "Failed to delete students");
  return resData;
}