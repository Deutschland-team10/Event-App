import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userProfile");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <p>Yükleniyor...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded shadow p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name} {user.surname}</h2>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate("/profile/edit")}
        >
          Düzenle
        </Button>
      </div>

      <div className="bg-white mt-6 p-6 rounded shadow space-y-2">
        <h3 className="font-semibold text-lg">Kişisel Bilgiler</h3>
        <p><strong>Ad:</strong> {user.name}</p>
        <p><strong>Soyad:</strong> {user.surname}</p>
        <p><strong>Cinsiyet:</strong> {user.gender}</p>
        <p><strong>Doğum Tarihi:</strong> {user.birthdate}</p>
        <p><strong>Şehir:</strong> {user.city}</p>
        <p><strong>İlgi Alanları:</strong> {user.interests?.join(", ")}</p>
      </div>
    </div>
  );
};

export default Profile;
