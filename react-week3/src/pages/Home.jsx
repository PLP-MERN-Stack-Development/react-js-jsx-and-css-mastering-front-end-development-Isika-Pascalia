import Card from '../components/Card'

export default function Home(){
  return (
    <div>
      <h1>Welcome to SoilSense</h1>
      <p>AI-Powered Soil Health Analysis — demo assignment (React, CSS, API).</p>
      <Card title="What this project demonstrates">
        <ul>
          <li>Component architecture</li>
          <li>State & hooks</li>
          <li>API integration (search & pagination)</li>
          <li>Theme, localStorage persistence</li>
        </ul>
      </Card>
    </div>
  )
}
