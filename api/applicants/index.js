const res = await fetch("/api/applicants");

if (!res.ok) {
  console.error("API error:", res.status);
  return;
}

const data = await res.json();
