'use client';

import { useId, useState } from 'react';
import './demos.css';

const loopSteps = [
  { name: 'Inspect', detail: 'Read the known failure and the current project state.' },
  { name: 'Decide', detail: 'Choose one bounded change that could address it.' },
  { name: 'Act', detail: 'Apply only that proposed change.' },
  { name: 'Verify', detail: 'Check the named test and inspect its evidence.' },
  { name: 'Report', detail: 'Record the result and the reason the loop stopped.' },
] as const;

export function LoopDemo() {
  const [step, setStep] = useState(0);
  const complete = step === loopSteps.length;
  const active = complete ? loopSteps.length - 1 : step;

  function advance() {
    setStep((current) => (current >= loopSteps.length ? 0 : current + 1));
  }

  return (
    <section className="writing-demo writing-demo-loop" aria-labelledby="writing-demo-loop-title">
      <header className="writing-demo-header">
        <div>
          <h3 id="writing-demo-loop-title">A bounded repair loop</h3>
          <p>Hypothetical walkthrough · no code is being run</p>
        </div>
        <span className="writing-demo-kicker">Limit: 1 pass</span>
      </header>

      <ol className="writing-demo-loop-track" aria-label="Loop stages">
        {loopSteps.map((item, index) => {
          const state = complete || index < step ? 'complete' : index === active ? 'active' : 'waiting';
          return (
            <li className={`writing-demo-loop-step writing-demo-loop-step-${state}`} key={item.name}>
              <span className="writing-demo-loop-dot" aria-hidden="true">{state === 'complete' ? '✓' : index + 1}</span>
              <span>{item.name}</span>
              <span className="writing-demo-visually-hidden"> — {state}</span>
            </li>
          );
        })}
      </ol>

      <div className="writing-demo-readout" aria-live="polite">
        <span>{complete ? 'Terminated' : `Step ${step + 1} of ${loopSteps.length}`}</span>
        <strong>{complete ? 'Stopped after the fixed pass.' : loopSteps[step].detail}</strong>
        <small>{complete ? 'A new pass requires an explicit restart.' : 'The next stage waits for a deliberate step.'}</small>
      </div>

      <button className="writing-demo-action" type="button" onClick={advance}>
        {complete ? 'Restart walkthrough' : step === loopSteps.length - 1 ? 'Finish and stop' : `Next: ${loopSteps[step + 1].name}`}
      </button>
    </section>
  );
}

const memoryNotes = [
  {
    id: 'idea',
    label: 'Quiet capture',
    kind: 'Idea',
    question: 'What would make capture useful without making it intrusive?',
    connections: ['Consent boundary'],
  },
  {
    id: 'principle',
    label: 'Human judgment',
    kind: 'Principle',
    question: 'Which decisions should the system always return to its author?',
    connections: ['Consent boundary', 'Useful friction'],
  },
  {
    id: 'question',
    label: 'Useful friction',
    kind: 'Question',
    question: 'Could a pause improve this decision more than another suggestion?',
    connections: ['Human judgment'],
  },
  {
    id: 'boundary',
    label: 'Consent boundary',
    kind: 'Boundary',
    question: 'Whose information is present, and who agreed to its use?',
    connections: ['Quiet capture', 'Human judgment'],
  },
] as const;

export function MemoryDemo() {
  const [selected, setSelected] = useState(0);
  const note = memoryNotes[selected];

  return (
    <section className="writing-demo writing-demo-memory" aria-labelledby="writing-demo-memory-title">
      <header className="writing-demo-header">
        <div>
          <h3 id="writing-demo-memory-title">Notes as a thinking surface</h3>
          <p>Synthetic notes · choose one to examine</p>
        </div>
      </header>

      <div className="writing-demo-memory-layout">
        <div className="writing-demo-memory-map" role="group" aria-label="Connected synthetic notes">
          <svg viewBox="0 0 240 180" aria-hidden="true" focusable="false">
            <path d="M48 30 L51 158" className={selected === 0 || selected === 3 ? 'writing-demo-memory-connection-active' : ''} />
            <path d="M194 32 L51 158" className={selected === 1 || selected === 3 ? 'writing-demo-memory-connection-active' : ''} />
            <path d="M194 32 L194 158" className={selected === 1 || selected === 2 ? 'writing-demo-memory-connection-active' : ''} />
          </svg>
          {memoryNotes.map((item, index) => (
            <button
              className={`writing-demo-memory-node writing-demo-memory-node-${index + 1}${selected === index ? ' writing-demo-memory-node-selected' : ''}`}
              type="button"
              key={item.id}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <span>{item.kind}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="writing-demo-memory-note" aria-live="polite">
          <span>{note.kind} · selected note</span>
          <strong>{note.label}</strong>
          <p key={note.id} className="writing-demo-change">{note.question}</p>
          <small>Connected to: {note.connections.join(' · ')}</small>
        </div>
      </div>
    </section>
  );
}

const applicationLayers = [
  {
    name: 'Model',
    role: 'Proposes',
    description: 'Reads the brief, identifies uncertainty, and drafts a possible response.',
    authority: 'Cannot approve a price or grant access.',
  },
  {
    name: 'Context',
    role: 'Informs',
    description: 'Supplies the relevant process rules and current, reviewed business knowledge.',
    authority: 'Can constrain a proposal, but does not execute it.',
  },
  {
    name: 'Tools',
    role: 'Executes',
    description: 'Performs narrow operations through named interfaces with recorded inputs.',
    authority: 'Acts only within permissions set elsewhere.',
  },
  {
    name: 'Controls',
    role: 'Authorizes',
    description: 'Applies deterministic calculations, permissions, logs, and human approval gates.',
    authority: 'Final authority remains here and with the responsible human.',
  },
] as const;

export function ApplicationDemo() {
  const [selected, setSelected] = useState(0);
  const layer = applicationLayers[selected];

  return (
    <section className="writing-demo writing-demo-application" aria-labelledby="writing-demo-application-title">
      <header className="writing-demo-header">
        <div>
          <h3 id="writing-demo-application-title">An application around the model</h3>
          <p>Hypothetical architecture · select a layer</p>
        </div>
      </header>

      <div className="writing-demo-application-layers" role="group" aria-label="Application layers">
        {applicationLayers.map((item, index) => (
          <button
            type="button"
            key={item.name}
            className={selected === index ? 'writing-demo-application-layer-selected' : ''}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item.name}</strong>
            <small>{item.role}</small>
          </button>
        ))}
      </div>

      <div className="writing-demo-application-insight" aria-live="polite">
        <span>{layer.name} / {layer.role}</span>
        <p key={layer.name} className="writing-demo-change">{layer.description}</p>
        <strong>{layer.authority}</strong>
      </div>
    </section>
  );
}

const contextFacts = [
  { id: 'scope', kind: 'Durable', text: 'Proposals require a human reviewer before sending.' },
  { id: 'rates', kind: 'Retrieved', text: 'Use the approved September rate sheet for line items.' },
  { id: 'deadline', kind: 'Temporary', text: 'Today’s draft is needed for a 15:00 internal review.' },
  { id: 'old', kind: 'Archive', text: 'A superseded template used a different approval order.' },
  { id: 'chat', kind: 'Archive', text: 'Last month’s stand-up opened with an office announcement.' },
] as const;

export function ContextDemo() {
  const [chosen, setChosen] = useState<string[]>(['scope', 'rates', 'deadline']);

  function toggle(id: string) {
    setChosen((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <section className="writing-demo writing-demo-context" aria-labelledby="writing-demo-context-title">
      <header className="writing-demo-header">
        <div>
          <h3 id="writing-demo-context-title">Select context for the task</h3>
          <p>Hypothetical facts · task: prepare a proposal draft for review</p>
        </div>
        <span className="writing-demo-kicker" role="status">{chosen.length} selected</span>
      </header>

      <div className="writing-demo-context-columns">
        <div className="writing-demo-context-archive">
          <h4>Available archive</h4>
          <div role="group" aria-label="Facts available for selection">
            {contextFacts.map((fact) => {
              const active = chosen.includes(fact.id);
              return (
                <button type="button" key={fact.id} aria-pressed={active} onClick={() => toggle(fact.id)}>
                  <span className={`writing-demo-context-check${active ? ' writing-demo-context-check-selected' : ''}`} aria-hidden="true">{active ? '✓' : '+'}</span>
                  <span><small>{fact.kind}</small>{fact.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="writing-demo-context-focus">
          <h4>Focused context</h4>
          {chosen.length ? (
            <ul>
              {contextFacts.filter((fact) => chosen.includes(fact.id)).map((fact) => (
                <li key={fact.id} className="writing-demo-change"><span>{fact.kind}</span>{fact.text}</li>
              ))}
            </ul>
          ) : <p>No facts selected. The system should retrieve or ask before drafting.</p>}
        </div>
      </div>
    </section>
  );
}

function formatMinutes(value: number) {
  const sign = value < 0 ? '−' : '';
  const absolute = Math.abs(value);
  const hours = Math.floor(absolute / 60);
  const minutes = absolute % 60;
  if (!hours) return `${sign}${minutes}m`;
  return `${sign}${hours}h ${minutes}m`;
}

function boundedInput(value: string, max: number): string {
  if (value === '') return '';
  const number = Number(value);
  return String(Number.isFinite(number) ? Math.min(max, Math.max(0, Math.round(number))) : 0);
}

export function TimeDemo() {
  const savedId = useId();
  const daysId = useId();
  const upkeepId = useId();
  const [saved, setSaved] = useState('20');
  const [days, setDays] = useState('5');
  const [upkeep, setUpkeep] = useState('30');
  const savedNumber = Math.max(0, Number(saved) || 0);
  const daysNumber = Math.max(0, Number(days) || 0);
  const upkeepNumber = Math.max(0, Number(upkeep) || 0);
  const gross = Math.round(savedNumber * daysNumber);
  const cost = Math.round(upkeepNumber);
  const net = gross - cost;

  return (
    <section className="writing-demo writing-demo-time" aria-labelledby="writing-demo-time-title">
      <header className="writing-demo-header">
        <div>
          <h3 id="writing-demo-time-title">A weekly time sketch</h3>
          <p>Hypothetical inputs · illustration, not a measurement</p>
        </div>
      </header>

      <div className="writing-demo-time-inputs">
        <label htmlFor={savedId}>
          <span>Minutes saved / day</span>
          <input id={savedId} type="number" min="0" max="1440" step="1" inputMode="numeric" value={saved} onChange={(event) => setSaved(boundedInput(event.target.value, 1440))} />
        </label>
        <label htmlFor={daysId}>
          <span>Days / week</span>
          <input id={daysId} type="number" min="0" max="7" step="1" inputMode="numeric" value={days} onChange={(event) => setDays(boundedInput(event.target.value, 7))} />
        </label>
        <label htmlFor={upkeepId}>
          <span>Weekly upkeep</span>
          <span className="writing-demo-time-field"><input id={upkeepId} type="number" min="0" max="10080" step="1" inputMode="numeric" value={upkeep} onChange={(event) => setUpkeep(boundedInput(event.target.value, 10080))} /><small>min</small></span>
        </label>
      </div>

      <dl className="writing-demo-time-results" aria-live="polite">
        <div><dt>Gross reclaimed</dt><dd>{formatMinutes(gross)}</dd></div>
        <div><dt>Upkeep</dt><dd>−{formatMinutes(cost)}</dd></div>
        <div className={net < 0 ? 'writing-demo-time-negative' : ''}><dt>Net weekly</dt><dd>{formatMinutes(net)}</dd></div>
      </dl>
      <p className="writing-demo-time-caution">
        {net < 0 ? 'In this sketch, upkeep costs more time than the tool returns.' : 'A positive estimate is still only useful if the recovered time has a chosen destination.'}
      </p>
    </section>
  );
}
