import CounterView from '@/components/counter-view';

async function fetchLatestIncident() {
  try {
    const res = await fetch('https://api.github.com/advisories?type=malware&sort=published&direction=desc&per_page=1', {
      next: { revalidate: 3600 } // revalidate every hour
    });
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        date: data[0].published_at,
        url: data[0].html_url,
        name: data[0].summary || "Malicious Package Detected"
      };
    }
  } catch (error) {
    console.error("Failed to fetch advisories:", error);
  }
  
  // Fallback to exactly yesterday to avoid showing huge numbers if fetch fails during build
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return {
    date: yesterday.toISOString(), 
    url: "https://github.com/advisories",
    name: "Recent Ecosystem Attack (Fallback)"
  };
}

export default async function CounterPage() {
  const incident = await fetchLatestIncident();
  
  return (
    <CounterView 
      lastAttackDateString={incident.date} 
      incidentUrl={incident.url} 
      incidentName={incident.name} 
    />
  );
}
