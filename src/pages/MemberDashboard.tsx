// src/pages/MemberDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, signOut } from '../utils/supabase';

interface LoyaltyData {
  total_points: number;
  lifetime_points: number;
  created_at: string;
  membership_tier: 'baby' | 'baby_elite';
  tier_started_at: string;
  subscription_status: string;
}

interface Transaction {
  id: string;
  points: number;
  transaction_type: string;
  source: string;
  description: string;
  created_at: string;
}

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/');
      return;
    }

    setUser(user);
    await fetchLoyaltyData(user.id);
    await fetchTransactions(user.id);
    setLoading(false);
  };

  const fetchLoyaltyData = async (userId: string) => {
    const { data } = await supabase
      .from('loyalty_points')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (data) {
      setLoyaltyData(data);
    }
  };

  const fetchTransactions = async (userId: string) => {
    const { data } = await supabase
      .from('loyalty_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setTransactions(data);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem',
          }}>
            ✦
          </div>
          <div>Loading your account...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: loyaltyData?.membership_tier === 'baby_elite' 
                ? 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)'
                : 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}>
              {loyaltyData?.membership_tier === 'baby_elite' ? '👑 ELITE MEMBER' : '⭐ BABY MEMBER'}
            </div>
            <h1 style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
            }}>
              MY ACCOUNT
            </h1>
            <p style={{
              color: '#999',
              fontSize: '1rem',
            }}>
              Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              padding: '0.875rem 2rem',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            SIGN OUT
          </button>
        </div>

        {/* Loyalty Points Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          {/* Membership Tier */}
          <div style={{
            background: loyaltyData?.membership_tier === 'baby_elite'
              ? 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(202, 138, 4, 0.1) 100%)'
              : 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(126, 34, 206, 0.1) 100%)',
            border: loyaltyData?.membership_tier === 'baby_elite'
              ? '2px solid #eab308'
              : '2px solid #9333ea',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              fontSize: '6rem',
              opacity: 0.1,
            }}>
              {loyaltyData?.membership_tier === 'baby_elite' ? '👑' : '⭐'}
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: '#666',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}>
              MEMBERSHIP TIER
            </div>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: loyaltyData?.membership_tier === 'baby_elite' ? '#eab308' : '#9333ea',
              lineHeight: 1.2,
              marginBottom: '0.5rem',
            }}>
              {loyaltyData?.membership_tier === 'baby_elite' ? 'Elite Baby' : 'NikHairrr Baby'}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#999',
            }}>
              {loyaltyData?.membership_tier === 'baby_elite' 
                ? '2x points on every purchase' 
                : '1x points on every purchase'}
            </div>
          </div>

          {/* Current Points */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              fontSize: '6rem',
              opacity: 0.05,
            }}>
              ✦
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: '#666',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}>
              AVAILABLE POINTS
            </div>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              {loyaltyData?.total_points || 0}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#999',
            }}>
              = ${((loyaltyData?.total_points || 0) / 50).toFixed(2)} in rewards
            </div>
            
            {/* Progress to Elite */}
            {loyaltyData?.membership_tier !== 'baby_elite' && (
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#999',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <span>Progress to Elite</span>
                  <span>{loyaltyData?.total_points || 0} / 2,500</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${Math.min(((loyaltyData?.total_points || 0) / 2500) * 100, 100)}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #eab308 0%, #ca8a04 100%)',
                    transition: 'width 0.3s ease',
                  }} />
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#eab308',
                  marginTop: '0.5rem',
                  fontWeight: 600,
                }}>
                  {2500 - (loyaltyData?.total_points || 0)} points to unlock 2x rewards!
                </div>
              </div>
            )}
          </div>

          {/* Lifetime Points */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2rem',
          }}>
            <div style={{
              fontSize: '0.85rem',
              color: '#666',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}>
              LIFETIME POINTS
            </div>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              {loyaltyData?.lifetime_points || 0}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#999',
            }}>
              Total earned since joining
            </div>
          </div>

          {/* Member Since */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2rem',
          }}>
            <div style={{
              fontSize: '0.85rem',
              color: '#666',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}>
              MEMBER SINCE
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}>
              {loyaltyData?.created_at 
                ? new Date(loyaltyData.created_at).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })
                : 'N/A'}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#999',
            }}>
              Thank you for being part of the family
            </div>
          </div>
        </div>

        {/* How Points Work */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          marginBottom: '3rem',
        }}>
          <h3 style={{
            color: '#ffffff',
            fontSize: '1.25rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            marginBottom: '1.5rem',
          }}>
            HOW LOYALTY POINTS WORK
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            <div>
              <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem' }}>
                🎁 Earn Points
              </div>
              <div style={{ color: '#999', fontSize: '0.95rem' }}>
                $1 spent = 1 point earned on every purchase
              </div>
            </div>
            <div>
              <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem' }}>
                💰 Redeem Points
              </div>
              <div style={{ color: '#999', fontSize: '0.95rem' }}>
                50 points = $1 off your next order — minimum redeemable: 500 points ($10)
              </div>
            </div>
            <div>
              <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '0.5rem' }}>
                ✨ Welcome Bonus
              </div>
              <div style={{ color: '#999', fontSize: '0.95rem' }}>
                New members receive 500 free points!
              </div>
            </div>
          </div>
        </div>

        {/* Redeem CTA */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '2rem',
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Redeemable: {Math.floor((loyaltyData?.total_points || 0) / 500)} x $10
            </div>
            <button
              onClick={async () => {
                const points = loyaltyData?.total_points || 0;
                const groups = Math.floor(points / 500);
                if (groups <= 0) {
                  alert('You need at least 500 points to redeem.');
                  return;
                }
                const confirm = window.confirm(`Redeem ${groups * 500} points for $${groups * 10} off?`);
                if (!confirm) return;

                try {
                  const pointsToRedeem = groups * 500;
                  const { error } = await supabase
                    .from('loyalty_transactions')
                    .insert([{ user_id: user.id, points: -pointsToRedeem, transaction_type: 'redeemed', source: 'redemption', description: `Redeemed ${pointsToRedeem} points for $${(pointsToRedeem/50).toFixed(2)} off` }]);
                  if (error) throw error;
                  // Refresh data
                  await fetchLoyaltyData(user.id);
                  await fetchTransactions(user.id);
                  alert('Redemption recorded. Apply your discount at checkout.');
                } catch (err: any) {
                  console.error('Redemption error', err);
                  alert('Failed to redeem points. Please try again.');
                }
              }}
              style={{
                padding: '0.75rem 1.25rem',
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              REDEEM POINTS
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h3 style={{
            color: '#ffffff',
            fontSize: '1.25rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            marginBottom: '1.5rem',
          }}>
            RECENT ACTIVITY
          </h3>
          
          {transactions.length === 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '3rem 2rem',
              textAlign: 'center',
              color: '#999',
            }}>
              No activity yet. Start shopping to earn points!
            </div>
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  style={{
                    padding: '1.5rem',
                    borderBottom: index < transactions.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{
                      color: '#ffffff',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                    }}>
                      {transaction.description || transaction.source}
                    </div>
                    <div style={{
                      color: '#666',
                      fontSize: '0.85rem',
                    }}>
                      {new Date(transaction.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: transaction.points > 0 ? '#51cf66' : '#ff6b6b',
                  }}>
                    {transaction.points > 0 ? '+' : ''}{transaction.points}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
