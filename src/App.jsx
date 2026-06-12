import { useState } from "react";

/* ── tiny helpers ── */
const YesNo = ({ value, onChange }) => (
  <div style={{ display: "flex", gap: 8 }}>
    {["Yes", "No"].map((opt) => {
      const isYes = opt === "Yes";
      const active = value === opt;
      return (
        <button
          key={opt}
          onClick={() => onChange(active ? "" : opt)}
          style={{
            padding: "5px 20px",
            borderRadius: 20,
            border: "1.5px solid",
            borderColor: active ? (isYes ? "#22c55e" : "#ef4444") : "#d1d5db",
            background: active ? (isYes ? "#dcfce7" : "#fee2e2") : "white",
            color: active ? (isYes ? "#15803d" : "#b91c1c") : "#6b7280",
            cursor: "pointer",
            fontWeight: active ? 700 : 400,
            fontSize: 13,
            transition: "all 0.15s",
          }}
        >
          {opt}
        </button>
      );
    })}
  </div>
);

const NoteBox = ({ value, onChange, placeholder = "Notes (optional)…" }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={2}
    style={{
      width: "100%",
      marginTop: 8,
      padding: "7px 10px",
      borderRadius: 8,
      border: "1.5px solid #e5e7eb",
      fontSize: 13,
      resize: "vertical",
      boxSizing: "border-box",
      fontFamily: "inherit",
      color: "#374151",
      background: "#fafafa",
    }}
  />
);

const Card = ({ num, accent, emoji, title, children }) => (
  <div
    style={{
      borderRadius: 14,
      border: `1.5px solid ${accent}30`,
      marginBottom: 12,
      overflow: "hidden",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    }}
  >
    <div
      style={{
        background: `${accent}15`,
        padding: "9px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderBottom: `1px solid ${accent}20`,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: accent,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 800,
          flexShrink: 0,
        }}
      >
        {num}
      </div>
      <span style={{ fontWeight: 700, color: accent, fontSize: 14, letterSpacing: 0.3 }}>
        {emoji} {title}
      </span>
    </div>
    <div style={{ padding: "12px 14px", background: "white" }}>{children}</div>
  </div>
);

const ChoiceGrid = ({ options, value, onChange, cols = 3 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
    {options.map(({ label, emoji, color }) => {
      const active = value === label;
      return (
        <button
          key={label}
          onClick={() => onChange(active ? "" : label)}
          style={{
            padding: "8px 6px",
            borderRadius: 10,
            border: `1.5px solid ${active ? color : "#e5e7eb"}`,
            background: active ? `${color}18` : "white",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: 20 }}>{emoji}</span>
          <span
            style={{
              fontSize: 11,
              fontWeight: active ? 700 : 400,
              color: active ? color : "#6b7280",
            }}
          >
            {label}
          </span>
        </button>
      );
    })}
  </div>
);

/* ── main component ── */
export default function CareChecklist() {
  const todayISO = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(todayISO);
  const [shift, setShift] = useState("");
  const [caregiver, setCaregiver] = useState("");

  const [sleep, setSleep] = useState("");
  const [sleepNotes, setSleepNotes] = useState("");

  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [foodQuality, setFoodQuality] = useState("");
  const [mealNotes, setMealNotes] = useState("");

  const [diaperChange, setDiaperChange] = useState(false);
  const [bodyCleaning, setBodyCleaning] = useState(false);
  const [cleaningNotes, setCleaningNotes] = useState("");

  const [medication, setMedication] = useState("");
  const [medNotes, setMedNotes] = useState("");

  const [mood, setMood] = useState("");
  const [moodNotes, setMoodNotes] = useState("");

  const [exercise, setExercise] = useState("");
  const [exerciseNotes, setExerciseNotes] = useState("");

  const [additionalNotes, setAdditionalNotes] = useState("");

  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const formatDate = (iso) => {
    const [y, m, d] = iso.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${d} ${months[+m - 1]} ${y}`;
  };

  const tick = (v) => (v ? "✅" : "❌");
  const yn = (v) => v || "—";
  const qualLabel = { Sufficient: "😊 Sufficient", Medium: "😐 Medium", Less: "😞 Less" };
  const moodEmoji = { Active: "😊", Dull: "😐", Sleepy: "😴", Irritated: "😠" };

  const generate = () => {
    const lines = [
      `📋 *DAILY HEALTH & CARE UPDATE*`,
      `📅 ${formatDate(date)}${shift ? " · " + shift + " shift" : ""}${caregiver ? " · 👤 " + caregiver : ""}`,
      ``,
      `1️⃣ *SLEEP* 😴`,
      `Enough sleep: ${yn(sleep)}${sleepNotes ? "\nNotes: " + sleepNotes : ""}`,
      ``,
      `2️⃣ *MEALS* 🍽️`,
      `Breakfast ${breakfast === "Yes" ? "✅" : breakfast === "No" ? "❌" : "—"} · Lunch ${lunch === "Yes" ? "✅" : lunch === "No" ? "❌" : "—"} · Dinner ${dinner === "Yes" ? "✅" : dinner === "No" ? "❌" : "—"}`,
      foodQuality ? `Quality: ${qualLabel[foodQuality]}` : `Quality: —`,
      mealNotes ? `Notes: ${mealNotes}` : null,
      ``,
      `3️⃣ *CLEANING & SANITATION* 🧼`,
      `Diaper change: ${tick(diaperChange)} · Body sponging: ${tick(bodyCleaning)}`,
      cleaningNotes ? `Notes: ${cleaningNotes}` : null,
      ``,
      `4️⃣ *MEDICATION* 💊`,
      `All medicines on time: ${yn(medication)}${medNotes ? "\nNotes: " + medNotes : ""}`,
      ``,
      `5️⃣ *MOOD & CONDITION*`,
      `${mood ? moodEmoji[mood] + " " + mood : "—"}${moodNotes ? "\nNotes: " + moodNotes : ""}`,
      ``,
      `6️⃣ *EXERCISE / MOVEMENT* 🏃`,
      `Movement done: ${yn(exercise)}${exerciseNotes ? "\nNotes: " + exerciseNotes : ""}`,
      additionalNotes ? `` : null,
      additionalNotes ? `7️⃣ *ADDITIONAL NOTES* 📝` : null,
      additionalNotes || null,
      ``,
      `🤲 _May Allah grant Papa good health and recovery. Ameen._`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    setMessage(lines);
    setCopied(false);
    setTimeout(() => {
      document.getElementById("msg-area")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const copy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
        paddingBottom: 32,
      }}
    >
      {/* ── header ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #4c1d95, #6d28d9, #7c3aed)",
          padding: "20px 18px 18px",
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 0.4 }}>
          📋 Papa's Daily Update
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>
          Fill in → tap Generate → paste in WhatsApp
        </div>
      </div>

      <div style={{ padding: "14px 12px 0" }}>
        {/* ── date / shift / caregiver ── */}
        <div
          style={{
            background: "white",
            borderRadius: 14,
            padding: "12px 14px",
            marginBottom: 12,
            border: "1.5px solid #e5e7eb",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 4 }}>
                DATE
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "7px 9px",
                  borderRadius: 8,
                  border: "1.5px solid #e5e7eb",
                  fontSize: 13,
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 4 }}>
                SHIFT
              </label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                style={{
                  width: "100%",
                  padding: "7px 9px",
                  borderRadius: 8,
                  border: "1.5px solid #e5e7eb",
                  fontSize: 13,
                  background: "white",
                  boxSizing: "border-box",
                }}
              >
                <option value="">– select –</option>
                {["Day", "Night"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <label style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", display: "block", marginBottom: 4 }}>
            YOUR NAME
          </label>
          <input
            type="text"
            value={caregiver}
            onChange={(e) => setCaregiver(e.target.value)}
            placeholder=""
            style={{
              width: "100%",
              padding: "7px 9px",
              borderRadius: 8,
              border: "1.5px solid #e5e7eb",
              fontSize: 13,
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* ── 1. sleep ── */}
        <Card num="1" accent="#16a34a" emoji="😴" title="SLEEP">
          <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px" }}>Did Papa get enough sleep?</p>
          <YesNo value={sleep} onChange={setSleep} />
          <NoteBox value={sleepNotes} onChange={setSleepNotes} />
        </Card>

        {/* ── 2. meals ── */}
        <Card num="2" accent="#d97706" emoji="🍽️" title="MEALS">
          <div style={{ display: "flex", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
            {[["Breakfast", breakfast, setBreakfast], ["Lunch", lunch, setLunch], ["Dinner", dinner, setDinner]].map(
              ([label, val, setter]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 5 }}>{label.toUpperCase()}</div>
                  <YesNo value={val} onChange={setter} />
                </div>
              )
            )}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 6 }}>FOOD QUALITY</div>
          <ChoiceGrid
            value={foodQuality}
            onChange={setFoodQuality}
            options={[
              { label: "Sufficient", emoji: "😊", color: "#22c55e" },
              { label: "Medium", emoji: "😐", color: "#f59e0b" },
              { label: "Less", emoji: "😞", color: "#ef4444" },
            ]}
          />
          <NoteBox value={mealNotes} onChange={setMealNotes} />
        </Card>

        {/* ── 3. cleaning ── */}
        <Card num="3" accent="#2563eb" emoji="🧼" title="CLEANING & SANITATION">
          {[
            ["Diaper change completed?", diaperChange, setDiaperChange],
            ["Body sponging / cleaning done?", bodyCleaning, setBodyCleaning],
          ].map(([label, val, setter]) => (
            <label
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={val}
                onChange={(e) => setter(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: "#2563eb", cursor: "pointer" }}
              />
              <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
            </label>
          ))}
          <NoteBox value={cleaningNotes} onChange={setCleaningNotes} />
        </Card>

        {/* ── 4. medication ── */}
        <Card num="4" accent="#7c3aed" emoji="💊" title="MEDICATION">
          <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px" }}>Were all medicines taken on time?</p>
          <YesNo value={medication} onChange={setMedication} />
          <NoteBox value={medNotes} onChange={setMedNotes} />
        </Card>

        {/* ── 5. mood ── */}
        <Card num="5" accent="#be185d" emoji="" title="MOOD & CONDITION">
          <ChoiceGrid
            value={mood}
            onChange={setMood}
            cols={4}
            options={[
              { label: "Active", emoji: "😊", color: "#22c55e" },
              { label: "Dull", emoji: "😐", color: "#94a3b8" },
              { label: "Sleepy", emoji: "😴", color: "#3b82f6" },
              { label: "Irritated", emoji: "😠", color: "#ef4444" },
            ]}
          />
          <NoteBox value={moodNotes} onChange={setMoodNotes} />
        </Card>

        {/* ── 6. exercise ── */}
        <Card num="6" accent="#0d9488" emoji="🏃" title="EXERCISE / MOVEMENT">
          <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px" }}>Was exercise or physical movement done?</p>
          <YesNo value={exercise} onChange={setExercise} />
          <NoteBox value={exerciseNotes} onChange={setExerciseNotes} />
        </Card>

        {/* ── 7. additional ── */}
        <Card num="7" accent="#b45309" emoji="📝" title="ADDITIONAL NOTES">
          <NoteBox
            value={additionalNotes}
            onChange={setAdditionalNotes}
            placeholder="Any other updates or observations…"
          />
        </Card>

        {/* ── generate button ── */}
        <button
          onClick={generate}
          style={{
            width: "100%",
            padding: 15,
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(135deg, #4c1d95, #6d28d9)",
            color: "white",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 16,
            letterSpacing: 0.3,
            boxShadow: "0 4px 14px rgba(109,40,217,0.35)",
          }}
        >
          ✨ Generate WhatsApp Message
        </button>

        {/* ── generated message ── */}
        {message && (
          <div id="msg-area" style={{ marginBottom: 8 }}>
            <div
              style={{
                background: "#e7fde8",
                borderRadius: "14px 14px 4px 14px",
                border: "1.5px solid #bbf7d0",
                padding: 14,
                position: "relative",
              }}
            >
              {/* WhatsApp "chat bubble" header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: "#15803d" }}>
                  💬 Ready to paste in WhatsApp
                </span>
                <button
                  onClick={copy}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: "none",
                    background: copied ? "#15803d" : "#25d366",
                    color: "white",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: 13,
                  color: "#1c1917",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {message}
              </pre>
            </div>
            {/* WhatsApp bubble tail */}
            <div style={{ textAlign: "right", marginTop: -2, paddingRight: 14 }}>
              <span style={{ fontSize: 10, color: "#6b7280" }}>Tap Copy → open WhatsApp → paste &amp; send</span>
            </div>
          </div>
        )}

        {/* ── footer ── */}
        <div
          style={{
            marginTop: 20,
            padding: "14px 16px",
            background: "linear-gradient(135deg, #4c1d95, #6d28d9)",
            borderRadius: 12,
            textAlign: "center",
            color: "white",
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>
            Teamwork · Consistency · Communication · Love
          </div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>
            🤲 May Allah grant Papa good health and recovery. Ameen.
          </div>
        </div>
      </div>
    </div>
  );
}
