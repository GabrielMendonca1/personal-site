"use client";

import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { copy, type Locale } from "@/lib/i18n";

type LocalTime = { label: string; sleeping: boolean };
const timeZone = "America/Bahia";

function getLocalTime(date: Date, locale: Locale): LocalTime {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "12";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  const period = (parts.find((part) => part.type === "dayPeriod")?.value ?? "AM").toLowerCase();
  const hour24 = Number(new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    hour12: false,
  }).format(date));
  const label = locale === "pt"
    ? new Intl.DateTimeFormat("pt-BR", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date)
    : `${hour}:${minute}${period}`;
  return { label, sleeping: hour24 >= 22 || hour24 < 7 };
}

function Bunny({ sleeping }: { sleeping: boolean }) {
  const color = "rgba(0, 0, 0, 0.4)";
  return (
    <svg className={`bunny ${sleeping ? "sleeping" : "awake"}`} width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g transform="translate(6, 8)">
        <g className="bunny-ear bunny-ear-left"><path d="M3.738 10.2164L7.224 2.007H9.167L5.676 10.2164H3.738ZM10.791 6.42705C10.791 5.90346 10.726 5.42764 10.596 4.99959C10.47 4.57155 10.292 4.16643 10.063 3.78425C9.833 3.39825 9.56 3.01797 9.243 2.64343C8.926 2.26507 8.767 2.07589 8.767 2.07589L10.24.958C10.24.958 10.433 1.172 10.819 1.6C11.209 2.024 11.559 2.491 11.869 2.999C12.178 3.507 12.413 4.042 12.574 4.604C12.734 5.166 12.814 5.774 12.814 6.427C12.814 7.107 12.73 7.73 12.562 8.296C12.394 8.858 12.153 9.397 11.84 9.913C11.526 10.425 11.181 10.883 10.802 11.288C10.428 11.697 10.24 11.902 10.24 11.902L8.767 10.784S8.924 10.595 9.237 10.216C9.554 9.842 9.83 9.46 10.063 9.07C10.3 8.676 10.479 8.267 10.602 7.843C10.728 7.415 10.791 6.943 10.791 6.427Z" fill={color}/></g>
        <g className="bunny-ear bunny-ear-right"><path d="M15.003 10.2164L18.489 2.007H20.432L16.941 10.2164H15.003ZM22.056 6.427C22.056 5.903 21.991 5.428 21.861 5C21.735 4.572 21.557 4.166 21.328 3.784C21.098 3.398 20.825 3.018 20.508 2.643C20.191 2.265 20.032 2.076 20.032 2.076L21.505.958s.193.214.579.642c.39.424.74.891 1.049 1.399.31.508.545 1.043.706 1.605.16.562.24 1.17.24 1.823 0 .68-.084 1.303-.252 1.869-.168.562-.409 1.101-.722 1.617-.314.512-.66.97-1.038 1.375-.374.409-.562.614-.562.614l-1.473-1.118s.157-.189.47-.568c.317-.374.592-.756.826-1.146.237-.394.416-.803.538-1.227.127-.428.19-.9.19-1.416Z" fill={color}/></g>
        <path d="M2.03 20.433c0 .523.063.999.189 1.427.126.428.304.835.533 1.221.229.382.502.761.82 1.135.317.379.475.568.475.568l-1.473 1.118s-.195-.214-.585-.642a10.38 10.38 0 0 1-1.043-1.399 6.08 6.08 0 0 1-.705-1.605A6.62 6.62 0 0 1 0 20.433c0-.681.084-1.302.252-1.863.169-.566.409-1.105.723-1.617.313-.516.657-.977 1.032-1.382.378-.409.567-.613.567-.613l1.473 1.118s-.158.189-.475.567a6.94 6.94 0 0 0-.826 1.153 5.24 5.24 0 0 0-.533 1.227 5.1 5.1 0 0 0-.183 1.41Zm21.657-.006c0-.523-.065-.999-.195-1.427a5.38 5.38 0 0 0-.533-1.216 8.13 8.13 0 0 0-.82-1.141c-.317-.378-.476-.567-.476-.567l1.473-1.118s.193.214.579.642c.39.424.74.891 1.05 1.399.309.508.544 1.043.705 1.605.16.562.24 1.17.24 1.823 0 .68-.084 1.303-.252 1.869-.168.562-.409 1.101-.722 1.617-.314.512-.659.971-1.038 1.376-.374.408-.562.613-.562.613l-1.473-1.118s.157-.189.47-.568c.317-.374.593-.756.826-1.146.237-.394.416-.803.539-1.227.126-.428.189-.9.189-1.416Z" fill={color}/>
        {sleeping ? <><rect fill={color} x="5.777" y="19.766" width="5" height="1.4" rx=".7"/><rect fill={color} x="17.378" y="19.766" width="5" height="1.4" rx=".7"/><g className="sleep-z" fill="none" stroke={color} strokeLinecap="round"><path d="m25 15 3-3h-3l3-3"/><path d="m27 8 2-2h-2l2-2"/></g></> : <><rect className="bunny-eye eye-one" fill={color} x="6.477" y="18.666" width="3.6" height="3.6" rx="1.8"/><rect className="bunny-eye eye-two" fill={color} x="18.078" y="18.666" width="3.6" height="3.6" rx="1.8"/></>}
      </g>
    </svg>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const [time, setTime] = useState<LocalTime | null>(null);
  useEffect(() => {
    const update = () => setTime(getLocalTime(new Date(), locale));
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, [locale]);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className={time ? "clock ready" : "clock"}>
          <span>{time?.label ?? (locale === "pt" ? "00:00" : "12:00am")} {copy[locale].location}</span>{" "}
          <span className="bunny-wrap"><Bunny sleeping={time?.sleeping ?? false}/></span>
        </p>
      </div>
    </footer>
  );
}

export default function SiteShell({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  return <main className="site-container"><div className="homepage"><LanguageSwitcher locale={locale} />{children}<Footer locale={locale} /></div></main>;
}
