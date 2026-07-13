import { useEffect, useMemo, useState } from "react";
import { engines } from "../data/site";

type Mode = "core" | "agent";

export default function SetupBuilder() {
  const [engineSlug, setEngineSlug] = useState("godot");
  const [mode, setMode] = useState<Mode>("core");
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const engine = useMemo(() => engines.find((item) => item.slug === engineSlug) ?? engines[0], [engineSlug]);

  return (
    <div className="setup-builder" data-hydrated={hydrated}>
      <div className="setup-controls" aria-label="Configure your Certael installation">
        <label>
          <span>01 / Engine</span>
          <select value={engineSlug} onChange={(event) => setEngineSlug(event.target.value)}>
            {engines.map((item) => <option value={item.slug} key={item.slug}>{item.name} {item.version}</option>)}
          </select>
        </label>
        <fieldset>
          <legend>02 / Protection</legend>
          <button className={mode === "core" ? "selected" : ""} onClick={() => setMode("core")}>Core</button>
          <button className={mode === "agent" ? "selected" : ""} onClick={() => setMode("agent")}>Core + Agent</button>
        </fieldset>
      </div>
      <div className="setup-output" aria-live="polite">
        <div className="setup-meta"><span>{engine.name}</span><span>{engine.version}</span><span>{mode === "agent" ? "Protected online" : "Authoritative online"}</span></div>
        <h3>Install {engine.artifact}</h3>
        <ol>
          <li>Download the artifact and checksum from the latest Core release.</li>
          <li>{engine.installPath}</li>
          <li>Bootstrap a bound session through your authenticated game transport.</li>
          <li>Validate and commit every protected action on the authoritative server.</li>
          {mode === "agent" && <li>Install Agent separately, configure its public trust store, and relay server-issued launch grants and challenges.</li>}
        </ol>
        <pre><code>{engine.snippet}</code></pre>
        <div className="setup-warning"><strong>Trust boundary</strong><span>{mode === "agent" ? "Agent evidence remains advisory. It does not authorize this action." : "The client signature admits bytes. Server-owned game state decides the outcome."}</span></div>
        <a className="button primary" href={`${import.meta.env.BASE_URL}engines/${engine.slug}/`}>Open the complete {engine.name} guide</a>
      </div>
    </div>
  );
}
