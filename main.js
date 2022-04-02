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


            // Filter by tag
            Array.from(document.getElementsByClassName("tag")).forEach(tag_element => {
                tag_element.addEventListener("click", clickOnTag)
            })

            function clickOnTag() {
                Array.from(document.getElementsByClassName("tag")).forEach(tag_element => {
                    tag_element.classList.remove("current")
                })
                this.classList.add("current")
                filterTasksByTag(this.innerText)
            }



            function filterTasksByTag(tag) {
                Array.from(document.getElementsByTagName("details")).forEach(details_element => {
                    // console.log(new Set(JSON.parse(details_element.getAttribute("data"))))
                    const details_element_tags = new Set(JSON.parse(details_element.getAttribute("data")))
                    tag == "Всё" ? details_element.classList.remove("hide") : 
                        details_element_tags.has(tag) ? details_element.classList.remove("hide") : details_element.classList.add("hide")
                })
            }
        })
})
