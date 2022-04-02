window.addEventListener("DOMContentLoaded", (e) => {
    fetch("tasks.json")
        .then(response => response.json())
        .then(json => {

            // Add tasks
            const tasks = json.tasks

            tasks.forEach((task, i) => renderTask(task, i))

            function renderTask (task, number) {
                document.getElementById("tasks").innerHTML +=
                    `<details data=${JSON.stringify(task.tags)}><summary>${number + 1} ${task.task}</summary><a href="${task.data}">Исходные данные</a><p>&#9989; ${task.result}</p></details>`
            }


            // Add tags
            const tags = new Set(tasks.map(task => task.tags).flat())
            tags.forEach(tag => renderTag(tag))

            function renderTag (tag_value) {
                document.getElementById("tags").innerHTML += `<a href="#" class="tag">${tag_value}</a>`
            }

        })
})
