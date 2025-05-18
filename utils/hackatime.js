async function getHackatimeData(userID, projectName) {
    const url = `https://hackatime.hackclub.com/api/summary?user=${userID}&from=2025-05-16&to=2025-05-18`
    const response = await fetch(url)
    const data = await response.json()
    let projects = data.projects
    projects = Object.values(projects)
    const project = projects.find((project) => project.key === projectName)
    console.log(project)
    const totalInHours = Math.round(project.total / 3600)
    console.log(totalInHours)
    return totalInHours
}

getHackatimeData("U01MPHKFZ7S", "thunder")

module.exports = { getHackatimeData }
