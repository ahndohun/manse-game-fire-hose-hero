import { GameClient } from "./GameClient";
import { GAME_CONFIG } from "./game-config";

export default function GamePage() {
  return (
    <main>
      <header className="game-hero">
        <p className="kicker">Independent Manse game</p>
        <h1>{GAME_CONFIG.title}</h1>
        <p className="summary">{GAME_CONFIG.summary}</p>
        <div className="privacy-line"><span aria-hidden="true" /> Camera stays on this device · no account · no analytics</div>
      </header>
      <GameClient />
      <footer>
        <p>Created by {GAME_CONFIG.creator}. Built with the open Manse engine. Stop whenever movement feels uncomfortable.</p>
        <a href={GAME_CONFIG.sourceUrl}>View source ↗</a>
      </footer>
    </main>
  );
}
