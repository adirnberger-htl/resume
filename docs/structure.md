# Website Structure & Content Map

This document outlines the planned structure of the Next.js resume website, based on the `Arthur_Dirnberger_Lebenslauf.pdf` and `me.md`. 

The website will be designed as a clean, responsive single-page application (or multi-page if preferred, but single-page is excellent for this amount of content) with smooth scrolling between sections.

## 1. Hero Section (Header)
*   **Visuals:** Professional photo (from the resume)
*   **Headline:** Arthur Dirnberger
*   **Tagline:** Software Engineering Student (Informatik SSE @ HTL Leonding)
*   **Call to Action:** "Contact Me" / "Download Resume" buttons
*   **Contact Info Links:** 
    *   Email: `arthur20.db@gmail.com`
    *   Phone: `(+43) 0660 9118 530`
    *   Location: `Hargelsberg, Austria`
    *   *Placeholders for GitHub / LinkedIn profiles*

## 2. About Me
*   **Summary:** A brief introductory paragraph about your focus on Software Engineering, Artificial Intelligence, and Entrepreneurship.
*   **Languages:** 
    *   German (Native)
    *   English (C1 Level)
*   **Hobbies:** Fitness Studio, Hiking/Mountaineering, Running, Cycling.

## 3. Experience
A chronological timeline showcasing your practical experience:
*   **SALESIANER MIETTEX, Enns** — *Ferialarbeit* (July 2025 - August 2025)
    *   *Description:* Work in the production department, operating various machines.
*   **LAWOG Linz, Linz** — *IT Praktikum* (July 2024 - August 2024)
    *   *Description:* IT Support, maintenance of computers, assisting employees with technical problems, network maintenance (access points, servers, switches).

## 4. Education
A timeline or list displaying your academic background:
*   **HTL Leonding** — *Informatik SSE* (Sept 2023 - Present)
    *   *Description:* School of Software Engineering - comprehensive IT education with a focus on Artificial Intelligence and Entrepreneurship.
*   **Gymnasium Werndlpark, Steyr** (Sept 2019 - July 2023)
    *   *Description:* Creative branch (technical/textile arts, geometric drawing).
*   **Volksschule Hargelsberg** (Sept 2015 - July 2019)

## 5. Skills & Extracurriculars
*   **School Clubs & Achievements:**
    *   Robotics - Lego Coach at "Robotic Olympiade District Linz"
    *   Cambridge Business English
*   **Technical Skills (Placeholder):** 
    *   *Note: Since you are studying Software Engineering, we should add a grid of programming languages, frameworks, and tools you know (e.g., Python, Java, Next.js, etc.) here.*

## 6. Projects (From `me.md`)
*   *Note: This section needs to be populated.*
*   A grid showcasing your personal or school projects.
*   **Format per project:**
    *   Project Title
    *   Brief description
    *   Tech stack used
    *   Link to GitHub repo / Live demo

## 7. Footer
*   Copyright info
*   Repeated social and contact links

---

## Technical Implementation Notes (Next.js)
*   **Components:** We will break these sections down into reusable React components (e.g., `<Hero />`, `<ExperienceTimeline />`, `<EducationList />`, `<ProjectCard />`).
*   **Data Handling:** The resume data (experience, education) can be stored in a clean `data/resume.json` or `.ts` file so it's easy for you to update without digging into the UI code.
*   **Styling:** Tailwind CSS will be used to style these sections, ensuring a mobile-first, responsive design.
