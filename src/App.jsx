import React, { useState, useEffect } from 'react';
import { Search, Users, Trophy, Star, TrendingUp, Grid, Filter, X, Plus, Menu, Award, Zap, ChevronRight, ShoppingCart } from 'lucide-react';

const SquadOS = () => {
  const [activeTab, setActiveTab] = useState('players');
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [filters, setFilters] = useState({
    position: '',
    nationality: '',
    league: '',
    minRating: 0,
    maxPrice: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [squad, setSquad] = useState([]);
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(12);
  const [dailyStreak, setDailyStreak] = useState(5);
  const [showRewards, setShowRewards] = useState(false);

  // Mock player data structure (in production, this comes from EA Sports API)
  const mockPlayers = [
    {
      id: 1,
      name: 'Erling Haaland',
      rating: 91,
      position: 'ST',
      nationality: 'Norway',
      club: 'Manchester City',
      league: 'Premier League',
      pace: 89,
      shooting: 91,
      passing: 65,
      dribbling: 80,
      defending: 45,
      physical: 88,
      price: 285000,
      image: 'https://cdn.futgg.workers.dev/content/fifa25/playerheads/p239085.png',
      rarity: 'gold'
    },
    {
      id: 2,
      name: 'Kylian Mbappé',
      rating: 92,
      position: 'ST',
      nationality: 'France',
      club: 'Real Madrid',
      league: 'LaLiga',
      pace: 97,
      shooting: 89,
      passing: 80,
      dribbling: 92,
      defending: 36,
      physical: 77,
      price: 450000,
      image: 'https://cdn.futgg.workers.dev/content/fifa25/playerheads/p231747.png',
      rarity: 'gold'
    },
    {
      id: 3,
      name: 'Kevin De Bruyne',
      rating: 91,
      position: 'CAM',
      nationality: 'Belgium',
      club: 'Manchester City',
      league: 'Premier League',
      pace: 76,
      shooting: 86,
      passing: 93,
      dribbling: 88,
      defending: 64,
      physical: 78,
      price: 195000,
      image: 'https://cdn.futgg.workers.dev/content/fifa25/playerheads/p192985.png',
      rarity: 'gold'
    },
    {
      id: 4,
      name: 'Virgil van Dijk',
      rating: 90,
      position: 'CB',
      nationality: 'Netherlands',
      club: 'Liverpool',
      league: 'Premier League',
      pace: 79,
      shooting: 60,
      passing: 71,
      dribbling: 72,
      defending: 91,
      physical: 86,
      price: 125000,
      image: 'https://cdn.futgg.workers.dev/content/fifa25/playerheads/p203376.png',
      rarity: 'gold'
    },
    {
      id: 5,
      name: 'Jude Bellingham',
      rating: 90,
      position: 'CM',
      nationality: 'England',
      club: 'Real Madrid',
      league: 'LaLiga',
      pace: 81,
      shooting: 82,
      passing: 81,
      dribbling: 86,
      defending: 78,
      physical: 84,
      price: 275000,
      image: 'https://cdn.futgg.workers.dev/content/fifa25/playerheads/p252371.png',
      rarity: 'gold'
    },
    {
      id: 6,
      name: 'Vinícius Jr.',
      rating: 91,
      position: 'LW',
      nationality: 'Brazil',
      club: 'Real Madrid',
      league: 'LaLiga',
      pace: 95,
      shooting: 83,
      passing: 79,
      dribbling: 92,
      defending: 29,
      physical: 67,
      price: 380000,
      image: 'https://cdn.futgg.workers.dev/content/fifa25/playerheads/p238794.png',
      rarity: 'gold'
    },
    {
      id: 7,
      name: 'Rodri',
      rating: 91,
      position: 'CDM',
      nationality: 'Spain',
      club: 'Manchester City',
      league: 'Premier League',
      pace: 61,
      shooting: 71,
      passing: 82,
      dribbling: 75,
      defending: 87,
      physical: 86,
      price: 165000,
      image: 'https://cdn.futgg.workers.dev/content/fifa25/playerheads/p231866.png',
      rarity: 'gold'
    },
    {
      id: 8,
      name: 'Lamine Yamal',
      rating: 81,
      position: 'RW',
      nationality: 'Spain',
      club: 'Barcelona',
      league: 'LaLiga',
      pace: 85,
      shooting: 73,
      passing: 78,
      dribbling: 86,
      defending: 33,
      physical: 59,
      price: 95000,
      image: 'https://cdn.futgg.workers.dev/content/fifa25/playerheads/p278789.png',
      rarity: 'gold'
    }
  ];

  useEffect(() => {
    setPlayers(mockPlayers);
  }, []);

  const searchPlayers = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = mockPlayers.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.position.toLowerCase().includes(query.toLowerCase())
      );
      setPlayers(filtered);
      // Award points for searches
      if (filtered.length > 0) {
        setUserPoints(prev => prev + 5);
      }
    } else {
      setPlayers(mockPlayers);
    }
  };

  const addToSquad = (player) => {
    if (squad.length < 11 && !squad.find(p => p.id === player.id)) {
      setSquad([...squad, player]);
      setUserPoints(prev => prev + 25); // Reward for building squad
    }
  };

  const removeFromSquad = (playerId) => {
    setSquad(squad.filter(p => p.id !== playerId));
  };

  const achievements = [
    { id: 1, title: 'First Squad', desc: 'Build your first 11-player squad', points: 100, completed: squad.length >= 11 },
    { id: 2, title: 'Scout Master', desc: 'Search for 50 players', points: 200, completed: false },
    { id: 3, title: 'Week Warrior', desc: 'Login 7 days in a row', points: 500, completed: dailyStreak >= 7 },
    { id: 4, title: 'Market Mogul', desc: 'Track 100 player prices', points: 300, completed: false }
  ];

  const PlayerCard = ({ player, onClick, compact = false }) => (
    <div 
      onClick={onClick}
      className={`player-card ${compact ? 'compact' : ''} ${player.rarity}`}
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      <div className="card-header">
        <div className="rating-box">
          <div className="rating">{player.rating}</div>
          <div className="position">{player.position}</div>
        </div>
        <img src={player.image} alt={player.name} className="player-image" />
      </div>
      <div className="card-body">
        <h3 className="player-name">{player.name}</h3>
        <div className="player-club">{player.club}</div>
        <div className="stats-mini">
          <div><span>PAC</span>{player.pace}</div>
          <div><span>SHO</span>{player.shooting}</div>
          <div><span>PAS</span>{player.passing}</div>
          <div><span>DRI</span>{player.dribbling}</div>
          <div><span>DEF</span>{player.defending}</div>
          <div><span>PHY</span>{player.physical}</div>
        </div>
        <div className="price">
          <TrendingUp size={14} />
          {player.price.toLocaleString()} coins
        </div>
      </div>
      {!compact && (
        <button className="add-btn" onClick={(e) => { e.stopPropagation(); addToSquad(player); }}>
          <Plus size={16} /> Add
        </button>
      )}
    </div>
  );

  return (
    <div className="fc-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%);
          color: #fff;
          overflow-x: hidden;
        }

        .fc-app {
          min-height: 100vh;
          position: relative;
        }

        /* Animated background effect */
        .fc-app::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(22, 199, 132, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        /* Header */
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 14, 39, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 1.5rem;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .logo {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 1px;
        }

        .logo span {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .search-bar {
          flex: 1;
          max-width: 500px;
          position: relative;
        }

        .search-bar input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .search-bar input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: #16c784;
          box-shadow: 0 0 0 3px rgba(22, 199, 132, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
        }

        .user-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .stat-item .icon {
          color: #16c784;
        }

        /* Navigation */
        .nav-tabs {
          position: sticky;
          top: 73px;
          z-index: 99;
          background: rgba(10, 14, 39, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0 1.5rem;
        }

        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
        }

        .nav-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
        }

        .nav-tab:hover {
          color: #fff;
        }

        .nav-tab.active {
          color: #16c784;
        }

        .nav-tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #16c784, #6366f1);
          border-radius: 3px 3px 0 0;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        /* Main Content */
        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          position: relative;
          z-index: 1;
        }

        .filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #16c784;
          transform: translateY(-2px);
        }

        /* Players Grid */
        .players-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .player-card {
          background: linear-gradient(135deg, rgba(30, 30, 50, 0.9) 0%, rgba(20, 20, 35, 0.9) 100%);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.5s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .player-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #16c784, #6366f1, #ec4899);
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .player-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(22, 199, 132, 0.2);
        }

        .player-card:hover::before {
          opacity: 0.3;
        }

        .card-header {
          position: relative;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          background: radial-gradient(ellipse at center, rgba(22, 199, 132, 0.1) 0%, transparent 70%);
        }

        .rating-box {
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
        }

        .rating {
          font-family: 'Rajdhani', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #16c784;
          line-height: 1;
        }

        .position {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          margin-top: -0.25rem;
        }

        .player-image {
          width: 140px;
          height: 180px;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
          transition: transform 0.3s ease;
        }

        .player-card:hover .player-image {
          transform: scale(1.05);
        }

        .card-body {
          text-align: center;
        }

        .player-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: #fff;
        }

        .player-club {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
        }

        .stats-mini {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .stats-mini > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .stats-mini span {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
        }

        .price {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #16c784;
          font-size: 0.9rem;
        }

        .add-btn {
          margin-top: 1rem;
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #16c784, #0f9d5f);
          border: none;
          border-radius: 10px;
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .add-btn:hover {
          background: linear-gradient(135deg, #0f9d5f, #16c784);
          transform: scale(1.05);
        }

        /* Squad Builder */
        .squad-builder {
          background: rgba(20, 20, 35, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          margin-top: 2rem;
        }

        .squad-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .squad-header h2 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
        }

        .squad-stats {
          display: flex;
          gap: 2rem;
          font-size: 0.9rem;
        }

        .squad-stats span {
          color: #16c784;
          font-weight: 700;
        }

        .squad-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .squad-slot {
          aspect-ratio: 3/4;
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.3);
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .squad-slot:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(22, 199, 132, 0.5);
        }

        .squad-slot.filled {
          border-style: solid;
          border-color: #16c784;
          background: rgba(22, 199, 132, 0.05);
          padding: 1rem;
        }

        .remove-btn {
          margin-top: 0.5rem;
          width: 100%;
          padding: 0.5rem;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          color: #ef4444;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        /* Rewards Section */
        .rewards-section {
          margin-top: 3rem;
        }

        .section-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .achievement-card {
          background: linear-gradient(135deg, rgba(30, 30, 50, 0.7) 0%, rgba(20, 20, 35, 0.7) 100%);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .achievement-card.completed {
          border-color: #16c784;
          background: linear-gradient(135deg, rgba(22, 199, 132, 0.1) 0%, rgba(20, 20, 35, 0.7) 100%);
        }

        .achievement-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .achievement-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .achievement-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #16c784, #6366f1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .achievement-card.completed .achievement-icon {
          background: #16c784;
        }

        .achievement-info h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .achievement-info p {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .achievement-points {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-weight: 600;
          color: #16c784;
        }

        /* Progress Bar */
        .progress-bar {
          margin-top: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2rem;
        }

        .level-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .level-info h3 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.5rem;
        }

        .progress-track {
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #16c784, #6366f1);
          border-radius: 6px;
          transition: width 1s ease;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .header-content {
            flex-wrap: wrap;
          }

          .search-bar {
            order: 3;
            max-width: 100%;
            flex-basis: 100%;
          }

          .user-stats {
            gap: 0.75rem;
          }

          .stat-item {
            padding: 0.4rem 0.75rem;
            font-size: 0.8rem;
          }

          .players-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1rem;
          }

          .squad-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .empty-state svg {
          margin-bottom: 1rem;
          opacity: 0.3;
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="logo">SQUAD<span style={{ color: '#6366f1' }}>OS</span></div>
          
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search players, clubs, nations..."
              value={searchQuery}
              onChange={(e) => searchPlayers(e.target.value)}
            />
          </div>

          <div className="user-stats">
            <div className="stat-item">
              <Zap className="icon" size={18} />
              <span>{userPoints.toLocaleString()} pts</span>
            </div>
            <div className="stat-item">
              <Award className="icon" size={18} />
              <span>Lvl {userLevel}</span>
            </div>
            <div className="stat-item">
              <Star className="icon" size={18} />
              <span>{dailyStreak} day streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="nav-tabs">
        <div className="nav-content">
          <button 
            className={`nav-tab ${activeTab === 'players' ? 'active' : ''}`}
            onClick={() => setActiveTab('players')}
          >
            <Users size={18} />
            Players
          </button>
          <button 
            className={`nav-tab ${activeTab === 'squad' ? 'active' : ''}`}
            onClick={() => setActiveTab('squad')}
          >
            <Grid size={18} />
            Squad Builder
          </button>
          <button 
            className={`nav-tab ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            <Trophy size={18} />
            Rewards
          </button>
          <button 
            className={`nav-tab ${activeTab === 'market' ? 'active' : ''}`}
            onClick={() => setActiveTab('market')}
          >
            <TrendingUp size={18} />
            Market
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === 'players' && (
          <>
            <div className="filter-bar">
              <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={16} />
                Filters
              </button>
              <button className="filter-btn">Position</button>
              <button className="filter-btn">League</button>
              <button className="filter-btn">Nation</button>
              <button className="filter-btn">Price Range</button>
            </div>

            <div className="players-grid">
              {players.map(player => (
                <PlayerCard 
                  key={player.id} 
                  player={player}
                  onClick={() => setSelectedPlayer(player)}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'squad' && (
          <div className="squad-builder">
            <div className="squad-header">
              <h2>My Squad</h2>
              <div className="squad-stats">
                <div>Players: <span>{squad.length}/11</span></div>
                <div>Chemistry: <span>78</span></div>
                <div>Rating: <span>{squad.length > 0 ? Math.round(squad.reduce((acc, p) => acc + p.rating, 0) / squad.length) : 0}</span></div>
              </div>
            </div>

            <div className="squad-grid">
              {[...Array(11)].map((_, i) => {
                const player = squad[i];
                return player ? (
                  <div key={i} className="squad-slot filled">
                    <PlayerCard player={player} compact />
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromSquad(player.id)}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div key={i} className="squad-slot">
                    <Plus size={32} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="rewards-section">
            <div className="progress-bar">
              <div className="level-info">
                <h3>Level {userLevel} Progress</h3>
                <span>{userPoints} / {(userLevel + 1) * 1000} XP</span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(userPoints / ((userLevel + 1) * 1000)) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="section-title">
              <Trophy size={28} />
              Achievements
            </h2>

            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.completed ? 'completed' : ''}`}
                >
                  <div className="achievement-header">
                    <div className="achievement-icon">
                      {achievement.completed ? <Award size={24} /> : <Star size={24} />}
                    </div>
                    <div className="achievement-info">
                      <h3>{achievement.title}</h3>
                      <p>{achievement.desc}</p>
                    </div>
                  </div>
                  <div className="achievement-points">
                    <Zap size={16} />
                    +{achievement.points} points
                    {achievement.completed && <span style={{ marginLeft: 'auto', color: '#16c784' }}>✓ Completed</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="empty-state">
            <TrendingUp size={64} />
            <h2>Market Analysis Coming Soon</h2>
            <p>Track player prices, market trends, and investment opportunities</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquadOS;
