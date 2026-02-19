import React, { useState, useEffect } from 'react';
import { Heart, Mail, Trash2, Save, Edit2, Tag, BadgeCheck } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  vote_average?: number;
}

interface ProfileProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
  onRemoveFavorite: (movie: Movie) => void;
  onShowDetails: (movie: Movie) => void;
  firstName: string;
  lastName: string;
  email: string;
  favorites: Movie[];
}

const Profile: React.FC<ProfileProps> = ({ 
  onLogout, 
  onDeleteAccount, 
  onRemoveFavorite, 
  onShowDetails, 
  firstName, 
  lastName, 
  email, 
  favorites 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    password: ""
  });

  useEffect(() => {
    setFormData({ 
      firstName: firstName || "", 
      lastName: lastName || "", 
      email: email || "", 
      password: "" 
    });
  }, [firstName, lastName, email]);

  return (
    <div className="w-full flex flex-col items-center p-6 text-white bg-slate-950 min-h-screen font-sans">
      
      {/* FORMULAIRE D'ÉDITION */}
      <div style={{ width: '100%', maxWidth: '700px' }} className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden mb-10">
        <div className="bg-gradient-to-r from-fuchsia-600 to-cyan-600 p-6 flex justify-between items-center border-b border-white/10">
          <h2 style={{ color: 'white' }} className="text-lg font-black uppercase tracking-[4px]">ÉDITION PROFIL</h2>
          <button onClick={() => setIsEditing(!isEditing)} className="bg-white/10 hover:bg-white/20 p-2 rounded-full border border-white/30 transition-all text-white">
            {isEditing ? <span className="text-xs px-3 font-bold">ANNULER</span> : <Edit2 size={20} />}
          </button>
        </div>

        <div className="p-10 py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase tracking-widest ml-1 text-white">Prénom</label>
              <div className="relative flex items-center">
                <BadgeCheck size={20} className="absolute left-4 text-fuchsia-500 z-10" />
                <input 
                  readOnly={!isEditing}
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  style={{ paddingLeft: '50px', color: isEditing ? 'black' : 'white' }} 
                  className={`w-full p-4 rounded-xl transition-all font-bold ${isEditing ? 'bg-white' : 'bg-slate-800/50 border-slate-700'}`}
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[11px] font-bold uppercase tracking-widest ml-1 text-white">Nom</label>
              <div className="relative flex items-center">
                <Tag size={20} className="absolute left-4 text-fuchsia-500 z-10" />
                <input 
                  readOnly={!isEditing}
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  style={{ paddingLeft: '50px', color: isEditing ? 'black' : 'white' }} 
                  className={`w-full p-4 rounded-xl transition-all font-bold ${isEditing ? 'bg-white' : 'bg-slate-800/50 border-slate-700'}`}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[11px] font-bold uppercase tracking-widest ml-1 text-white">Email</label>
            <div className="relative flex items-center">
              <Mail size={20} className="absolute left-4 text-cyan-400 z-10" />
              <input 
                readOnly
                value={formData.email}
                style={{ paddingLeft: '50px', color: 'white' }} 
                className="w-full p-4 rounded-xl bg-slate-800/50 border-slate-700 font-bold opacity-70"
              />
            </div>
          </div>

          {isEditing && (
            <button className="w-full py-4 bg-cyan-500 text-black font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3">
              <Save size={20} /> ENREGISTRER DANS LA BASE
            </button>
          )}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '700px' }} className="flex gap-4 mb-12">
        <button onClick={onLogout} className="flex-1 bg-slate-800 hover:bg-slate-700 p-4 rounded-xl text-[11px] font-bold uppercase tracking-[2px] border border-slate-700 transition-all text-white">Déconnexion</button>
        <button onClick={onDeleteAccount} className="flex-1 bg-red-950/30 hover:bg-red-600 p-4 rounded-xl text-[11px] font-bold text-red-500 hover:text-white uppercase tracking-[2px] border border-red-900/50 transition-all">Détruire Compte</button>
      </div>

      <div className="w-full max-w-6xl border-t border-slate-800 pt-10">
        <h3 className="text-sm font-black mb-8 flex items-center justify-center gap-3 uppercase tracking-[6px] text-white">
          <Heart size={20} className="text-fuchsia-500 fill-fuchsia-500" /> 
          FAVORIS <span className="text-slate-500 font-mono">[{favorites.length}]</span>
        </h3>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
            {favorites.map((movie) => (
              <div key={movie.id} className="relative group rounded-lg overflow-hidden border border-slate-800 aspect-[2/3] bg-slate-900 shadow-xl transition-all hover:scale-105">
                <img 
                  onClick={() => onShowDetails(movie)}
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300'} 
                  className="w-full h-full object-cover cursor-pointer" 
                  alt={movie.title} 
                />
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    onRemoveFavorite(movie); 
                  }}
                  className="absolute top-1 right-1 bg-red-600 p-2 rounded-md shadow-2xl hover:bg-red-500 transition-colors border border-white/20 z-[100]"
                >
                  <Trash2 size={16} color="white" strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 font-mono text-xs italic text-center">AUCUNE DONNÉE DANS LA TABLE FAVORIS</p>
        )}
      </div>
    </div>
  );
};

export default Profile;