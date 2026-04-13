
import { useAppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import { User, Calendar, Scale, Ruler, Target } from "lucide-react";

const Profile = () => {
  const { user } = useAppContext();

  return (
   
  <div className="page-container px-6 py-6">
    
    {/* 🔹 Header */}
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-white">Profile</h1>
      <p className="text-sm text-slate-400">Manage your settings</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 🔹 LEFT: Profile Card */}
      <div className="lg:col-span-2">
        <Card className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">

          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Your Profile</p>
              <p className="text-sm text-slate-400">Member since 4/5/2026</p>
            </div>
          </div>

          {/* Info Rows */}
          <div className="space-y-4">

  {/* Age */}
  <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-500/10">
        <Calendar className="w-5 h-5 text-blue-400" />
      </div>
      <span className="text-slate-400">Age</span>
    </div>
    <span className="text-white font-medium">{user?.age} years</span>
  </div>

  {/* Weight */}
  <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-purple-500/10">
        <Scale className="w-5 h-5 text-purple-400" />
      </div>
      <span className="text-slate-400">Weight</span>
    </div>
    <span className="text-white font-medium">{user?.weight} kg</span>
  </div>

  {/* Height */}
  <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-500/10">
        <Ruler className="w-5 h-5 text-green-400" />
      </div>
      <span className="text-slate-400">Height</span>
    </div>
    <span className="text-white font-medium">{user?.height} cm</span>
  </div>

  {/* Goal */}
  <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-orange-500/10">
        <Target className="w-5 h-5 text-orange-400" />
      </div>
      <span className="text-slate-400">Goal</span>
    </div>
    <span className="text-white font-medium">{user?.goal}</span>
  </div>

</div>
          {/* Edit Button */}
          <button
            className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition"
          >
            Edit Profile
          </button>
        </Card>
      </div>

      {/* 🔹 RIGHT: Stats + Logout */}
      <div className="space-y-6">

        {/* Stats Card */}
        <Card className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <p className="text-white font-semibold mb-4">Your Stats</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <p className="text-emerald-400 text-xl font-bold">0</p>
              <p className="text-slate-400 text-sm">Food entries</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 text-center">
              <p className="text-blue-400 text-xl font-bold">0</p>
              <p className="text-slate-400 text-sm">Activities</p>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <button className="w-full border border-red-500 text-red-400 py-3 rounded-xl hover:bg-red-500 hover:text-white transition">
          Logout
        </button>

      </div>
    </div>
  </div>
);
  
};

export default Profile