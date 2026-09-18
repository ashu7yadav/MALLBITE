import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Sparkles, 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  DollarSign, 
  Flame, 
  Utensils, 
  RefreshCw,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useMall } from '../../context/MallContext';
import { api } from '../../services/api';
import { groupPlannerService } from '../../services/groupPlannerService';
import confetti from 'canvas-confetti';

const DEFAULT_MEMBERS = [
  { id: 1, name: "Ashutosh", diet: "Veg", budget: 200, spice: "Medium", cuisine: "Burgers & Wraps", dislikes: "" },
  { id: 2, name: "Priya", diet: "Jain", budget: 180, spice: "Mild", cuisine: "Pizzas", dislikes: "garlic" },
  { id: 3, name: "Rohan", diet: "Non-Veg", budget: 250, spice: "Spicy", cuisine: "Asian & Bowls", dislikes: "" },
  { id: 4, name: "Sneha", diet: "Veg", budget: 150, spice: "Medium", cuisine: "Burgers & Wraps", dislikes: "" }
];

export const GroupFoodPlannerModal = ({ isOpen, onClose }) => {
  const { menuItems, restaurants, addNotification } = useMall();
  const { addToCart, setIsCartDrawerOpen } = useCart();

  const [step, setStep] = useState(1); // 1: Count, 2: Preferences, 3: Budget, 4: Generating, 5: Results
  const [peopleCount, setPeopleCount] = useState(4);
  const [members, setMembers] = useState(DEFAULT_MEMBERS);
  const [totalBudget, setTotalBudget] = useState(800);
  const [isSolving, setIsSolving] = useState(false);
  const [planResult, setPlanResult] = useState(null);

  // Sync members array with people count
  useEffect(() => {
    if (peopleCount !== members.length) {
      const updated = [];
      for (let i = 0; i < peopleCount; i++) {
        if (members[i]) {
          updated.push(members[i]);
        } else {
          updated.push({
            id: i + 1,
            name: `Person ${i + 1}`,
            diet: i === 1 ? "Jain" : i === 2 ? "Non-Veg" : "Veg",
            budget: 200,
            spice: "Medium",
            cuisine: "any",
            dislikes: ""
          });
        }
      }
      setMembers(updated);
      setTotalBudget(updated.reduce((sum, m) => sum + (Number(m.budget) || 200), 0));
    }
  }, [peopleCount]);

  if (!isOpen) return null;

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
    if (field === 'budget') {
      const newTotal = updated.reduce((sum, m) => sum + (Number(m.budget) || 200), 0);
      setTotalBudget(newTotal);
    }
  };

  const handleGeneratePlan = async () => {
    setStep(4);
    setIsSolving(true);

    try {
      // Try backend endpoint first
      const res = await api.getGroupPlanRecommendations(members, totalBudget);
      if (res && res.success) {
        setPlanResult(res);
      } else {
        // Fallback to client-side solver
        const localRes = groupPlannerService.solve(members, totalBudget, menuItems, restaurants);
        setPlanResult(localRes);
      }
    } catch {
      // Offline fallback
      const localRes = groupPlannerService.solve(members, totalBudget, menuItems, restaurants);
      setPlanResult(localRes);
    } finally {
      setTimeout(() => {
        setIsSolving(false);
        setStep(5);
        confetti({ particleCount: 60, spread: 60 });
      }, 1000);
    }
  };

  const handleAddAllToCart = () => {
    if (!planResult || !planResult.members) return;

    let itemsAddedCount = 0;
    planResult.members.forEach(m => {
      if (m.item) {
        addToCart(m.item, 1);
        itemsAddedCount += 1;
      }
    });

    addNotification(
      "Group Plan Added! 🎉",
      `Added ${itemsAddedCount} dishes across ${planResult.participatingOutletsCount} outlets to your unified cart.`,
      "success"
    );

    onClose();
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] text-left">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FFF4EC] via-white to-[#FFF4EC] border-b border-[#F6DEC9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#F95721] to-amber-500 text-white flex items-center justify-center font-black shadow-md shadow-[#F95721]/25">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-[#2A2521] font-display">
                  AI Group Food Planner
                </h3>
                <span className="bg-[#F95721] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                  Multi-Outlet
                </span>
              </div>
              <p className="text-xs text-[#6F665D]">
                Feed everyone at Table A17 respecting everyone's diet & budget in 1 order
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors border border-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Bar */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-500">
          <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-[#F95721] font-black' : step > 1 ? 'text-emerald-600' : ''}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">1</span>
            <span>Group Size</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-[#F95721] font-black' : step > 2 ? 'text-emerald-600' : ''}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">2</span>
            <span>Preferences</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-[#F95721] font-black' : step > 3 ? 'text-emerald-600' : ''}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">3</span>
            <span>Budget</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <div className={`flex items-center gap-1.5 ${step === 5 ? 'text-[#F95721] font-black' : ''}`}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">4</span>
            <span>Meal Plan</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Number of People */}
          {step === 1 && (
            <div className="space-y-6 text-center py-4">
              <div>
                <h4 className="text-xl font-black text-[#2A2521] font-display">
                  How many people are dining at your table?
                </h4>
                <p className="text-xs text-[#6F665D] mt-1">
                  Each person can have their own dietary needs (Veg, Jain, Non-Veg) and budget.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                {[2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => setPeopleCount(num)}
                    className={`w-14 h-14 rounded-2xl font-black font-display text-lg transition-all ${peopleCount === num ? 'bg-[#F95721] text-white shadow-lg shadow-[#F95721]/30 scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="bg-[#FFF4EC] p-4 rounded-2xl border border-[#F6DEC9] text-xs text-[#6F665D] max-w-md mx-auto">
                💡 Default test scenario loaded: <strong>4 friends (Veg + Jain + Non-Veg + Veg) with ₹800 budget</strong>.
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-[#F95721] hover:bg-[#EA580C] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95"
                >
                  <span>Continue to Member Preferences</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Dietary Preferences & Allergies */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base sm:text-lg font-black text-[#2A2521] font-display">
                  Customize Each Person's Preferences
                </h4>
                <p className="text-xs text-[#6F665D]">
                  Set dietary restrictions, spice level, and individual budget allocations.
                </p>
              </div>

              <div className="space-y-4">
                {members.map((member, index) => (
                  <div key={member.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#F95721] text-white font-black text-xs flex items-center justify-center">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                          className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-black text-slate-900 w-36 focus:outline-none focus:border-[#F95721]"
                          placeholder="Name"
                        />
                      </div>

                      {/* Dietary Radio Pills */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {['Veg', 'Jain', 'Non-Veg', 'Vegan'].map(dietOpt => (
                          <button
                            key={dietOpt}
                            onClick={() => handleMemberChange(index, 'diet', dietOpt)}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all ${member.diet === dietOpt ? (dietOpt === 'Jain' ? 'bg-amber-500 text-white' : dietOpt === 'Non-Veg' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white') : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                          >
                            {dietOpt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Cuisine Wish</label>
                        <select
                          value={member.cuisine}
                          onChange={(e) => handleMemberChange(index, 'cuisine', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-700 focus:outline-none"
                        >
                          <option value="any">Any Delicious Outlet</option>
                          <option value="Burgers & Wraps">Burgers & Wraps (Burger House)</option>
                          <option value="Pizzas">Pizzas (Pizza Corner)</option>
                          <option value="Asian & Bowls">Asian & Wok (Wok Express)</option>
                          <option value="South Indian">South Indian (South Kitchen)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Allocated Budget (₹)</label>
                        <input
                          type="number"
                          value={member.budget}
                          onChange={(e) => handleMemberChange(index, 'budget', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-black text-slate-900 focus:outline-none"
                          min="50"
                          max="1000"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Spice Preference</label>
                        <select
                          value={member.spice}
                          onChange={(e) => handleMemberChange(index, 'spice', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold text-slate-700 focus:outline-none"
                        >
                          <option value="Mild">Mild</option>
                          <option value="Medium">Medium</option>
                          <option value="Spicy">Spicy 🔥</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 bg-[#F95721] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95"
                >
                  <span>Review Total Budget</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Group Budget Review */}
          {step === 3 && (
            <div className="space-y-6 py-2">
              <div className="text-center">
                <h4 className="text-xl font-black text-[#2A2521] font-display">
                  Group Total Budget Review
                </h4>
                <p className="text-xs text-[#6F665D] mt-1">
                  The AI solver will find the optimal combination across outlets staying under this cap.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-[#FAF7F2] p-6 rounded-3xl border border-[#EFE8DE] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Group Budget</span>
                  <div className="flex items-center gap-1 text-2xl font-black text-[#F95721] font-display">
                    <span>₹</span>
                    <input
                      type="number"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(Number(e.target.value))}
                      className="w-24 bg-white border border-[#EFE8DE] rounded-xl px-2 py-1 text-xl font-black text-[#2A2521] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t border-[#EFE8DE] pt-3 text-xs">
                  {members.map(m => (
                    <div key={m.id} className="flex justify-between items-center text-[#6F665D]">
                      <span>{m.name} ({m.diet})</span>
                      <span className="font-bold text-[#2A2521]">₹{m.budget}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleGeneratePlan}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#F95721] to-amber-500 hover:from-[#EA580C] hover:to-amber-600 text-white px-7 py-3 rounded-2xl font-black text-sm shadow-xl shadow-[#F95721]/25 transition-all hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Perfect Group Meal</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Generating Animation */}
          {step === 4 && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#F95721] to-amber-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-[#F95721]/30 animate-spin" style={{ animationDuration: '4s' }}>
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <h4 className="text-xl font-black text-[#2A2521] font-display">
                Solving Multi-Outlet Combination...
              </h4>
              <p className="text-xs text-[#6F665D] max-w-sm mx-auto">
                Cross-matching dietary filters, wait-time synchronicity, and budget limits across Burger House, Pizza Corner & Wok Express.
              </p>
            </div>
          )}

          {/* STEP 5: Results Screen ("Perfect Group Meal") */}
          {step === 5 && planResult && (
            <div className="space-y-6">
              
              {/* Top Banner with Savings */}
              <div className="bg-gradient-to-r from-[#2A2521] via-[#352D26] to-[#2A2521] text-white p-5 sm:p-6 rounded-3xl shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Recommendation Generated</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-white font-display">
                    Perfect Group Meal
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-md">
                    {planResult.explanation}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-right shrink-0">
                  <div className="text-xs text-slate-300 font-bold">Total Planned</div>
                  <div className="text-2xl font-black text-amber-300 font-display">
                    ₹{planResult.totalPlanned}
                  </div>
                  <span className="text-[11px] font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-400/30">
                    Saved ₹{planResult.totalSaved}
                  </span>
                </div>
              </div>

              {/* Person-by-Person Recommendation Cards */}
              <div className="space-y-3">
                <h5 className="text-xs font-black text-[#8E857C] uppercase tracking-wider">
                  Person-wise Recommendations ({planResult.members?.length} Members)
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {planResult.members?.map((m) => (
                    <div key={m.memberId} className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFE8DE] shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#2A2521] text-white font-black text-[11px] flex items-center justify-center">
                            {m.memberId}
                          </span>
                          <span className="font-black text-sm text-[#2A2521] font-display">
                            {m.memberName}
                          </span>
                        </div>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${m.diet === 'Jain' ? 'bg-amber-100 text-amber-800' : m.diet === 'Non-Veg' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {m.diet}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-[#EFE8DE] flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <h6 className="font-black text-xs text-[#2A2521] truncate">
                            {m.item.name}
                          </h6>
                          <p className="text-[11px] text-[#F95721] font-extrabold truncate">
                            {m.item.outletName} • <span className="text-slate-400 font-medium">{m.item.counterNumber}</span>
                          </p>
                        </div>
                        <span className="font-black text-sm text-[#2A2521] shrink-0 font-display">
                          ₹{m.item.price}
                        </span>
                      </div>

                      <p className="text-[10px] text-[#6F665D] font-medium bg-[#FFF4EC] p-2 rounded-lg border border-[#F6DEC9]">
                        {m.matchedReason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-xs font-black text-[#6F665D] hover:text-[#2A2521] bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-2xl transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Modify Preferences</span>
                </button>

                <button
                  onClick={handleAddAllToCart}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F95721] hover:bg-[#EA580C] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-[#F95721]/30 transition-all hover:scale-105 active:scale-95 font-display"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Entire Plan to Cart (₹{planResult.totalPlanned})</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
