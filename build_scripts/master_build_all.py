import os
import sys
import time

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def run_master_build():
    target_dir = r"C:\Users\gauth\OneDrive\Desktop\shambhu persnal folder\final_internship_project_backlift_ai"
    os.makedirs(target_dir, exist_ok=True)
    print("=" * 78)
    print("[*] BACKLIFT AI -- MASTER SUBMISSION GENERATOR")
    print(f"Destination: {target_dir}")
    print("=" * 78)

    # 1. Problem Statement
    print("\n[1/12] Building 01 Problem Statement.pdf...")
    import make_pdf_01_problem_statement
    make_pdf_01_problem_statement.generate_pdf(os.path.join(target_dir, "01 Problem Statement.pdf"))

    # 2. Brand Identity
    print("\n[2/12] Building 02 Brand Identity.pdf...")
    import make_pdf_02_brand_identity
    make_pdf_02_brand_identity.generate_pdf(os.path.join(target_dir, "02 Brand Identity.pdf"))

    # 3. Product Definition
    print("\n[3/12] Building 03 Product Definition.pdf...")
    import make_pdf_03_product_definition
    make_pdf_03_product_definition.generate_pdf(os.path.join(target_dir, "03 Product Definition.pdf"))

    # 4. User Journey Map
    print("\n[4/12] Building 04 User Journey Map.pdf...")
    import make_pdf_04_user_journey_map
    make_pdf_04_user_journey_map.generate_pdf(os.path.join(target_dir, "04 User Journey Map.pdf"))

    # 5. UI/UX Prototype & Figma
    print("\n[5/12] Building 05 UI UX Prototype...")
    import make_05_ui_ux_prototype
    make_05_ui_ux_prototype.generate_pdf(os.path.join(target_dir, "05 UI UX Prototype - Figma Link.pdf"))
    make_05_ui_ux_prototype.generate_txt(os.path.join(target_dir, "05 UI UX Prototype - Figma Link.txt"))

    # 6. Business Model
    print("\n[6/12] Building 06 Business Model.pdf...")
    import make_pdf_06_business_model
    make_pdf_06_business_model.generate_pdf(os.path.join(target_dir, "06 Business Model.pdf"))

    # 7. Business Plan
    print("\n[7/12] Building 07 Business Plan.pdf...")
    import make_pdf_07_business_plan
    make_pdf_07_business_plan.generate_pdf(os.path.join(target_dir, "07 Business Plan.pdf"))

    # 8. Financial Projections Spreadsheet
    print("\n[8/12] Building 08 Financial Projection.xlsx...")
    import make_excel_08_financial_projection
    make_excel_08_financial_projection.build_financial_model(os.path.join(target_dir, "08 Financial Projection.xlsx"))

    # 9. Landing Page
    print("\n[9/12] Building 09 Landing Page...")
    import make_09_landing_page
    make_09_landing_page.generate_pdf(os.path.join(target_dir, "09 Landing Page - Live Link.pdf"))
    make_09_landing_page.generate_txt(os.path.join(target_dir, "09 Landing Page - Live Link.txt"))

    # 10. AI Data Strategy
    print("\n[10/12] Building 10 AI Data Strategy.pdf...")
    import make_pdf_10_ai_data_strategy
    make_pdf_10_ai_data_strategy.generate_pdf(os.path.join(target_dir, "10 AI Data Strategy.pdf"))

    # 11. Datasets & Sources (PDF & raw catalog directory)
    print("\n[11/12] Building 11 Dataset & Sources.pdf and dataset directory...")
    import make_11_dataset_and_sources
    make_11_dataset_and_sources.generate_pdf(os.path.join(target_dir, "11 Dataset & Sources.pdf"))
    make_11_dataset_and_sources.build_datasets_and_sources(target_dir)

    # 12. Working AI Prototype Link & Runner
    print("\n[12/12] Building 12 Working AI Prototype...")
    import make_12_working_ai_prototype
    make_12_working_ai_prototype.generate_pdf(os.path.join(target_dir, "12 Working AI Prototype Link.pdf"))
    make_12_working_ai_prototype.generate_txt(os.path.join(target_dir, "12 Working AI Prototype Link.txt"))
    make_12_working_ai_prototype.generate_runner_script(os.path.join(target_dir, "run_prototype_demo.py"))

    # Master README
    readme_path = os.path.join(target_dir, "README.md")
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write("""# 🎓 BackLift AI — Final Internship Project Submission Package

> **Startup Project Name:** BackLift AI  
> **Tagline:** From Backlog Paralysis to Degree Completion  
> **Domain:** EdTech / Higher Education Academic Recovery & Remediation Platform  
> **Assignment Reference:** BridgeAura — From Problem to Pitch (Complete 28-Page Guidelines)  

---

## 🌐 Official Verification & Interactive Access Links

| Asset / Deliverable | Official Verified URL | Description |
| :--- | :--- | :--- |
| **🚀 Live Production Web Application** | **[https://shambhavisharma2608-dot.github.io/backlift_ai/](https://shambhavisharma2608-dot.github.io/backlift_ai/)** | Deployed on GitHub Pages. Direct in-browser testing of Landing Page, Login, Student Dashboard, Backlog Matrix, and AI LiftBot with 5 queries. |
| **📦 GitHub Source Code Repository** | **[https://github.com/shambhavisharma2608-dot/backlift_ai](https://github.com/shambhavisharma2608-dot/backlift_ai)** | Complete full-stack React 19 + TypeScript + Vite codebase, git commit logs, and CI/CD automated deployment workflow. |
| **🎨 Interactive Figma Prototype** | **[https://www.figma.com/make/KN916hkdl3762ch5EnrQoV/backlift_ai?t=b51UAJWRmicmOZu8-1](https://www.figma.com/make/KN916hkdl3762ch5EnrQoV/backlift_ai?t=b51UAJWRmicmOZu8-1)** | 8-screen high-fidelity interactive prototype, UI design system tokens, components, and user flows. |

---

## 📌 Master Submission Index & Deliverables Checklist

This folder contains the complete, official startup deliverables matching the exact internship submission checklist (Deliverables 01 through 12):

| Deliverable # | Required File | Format | Description / Contents | Status |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `01 Problem Statement.pdf` | PDF | Problem breakdown, target user personas, current solution failures, pain points, market opportunity | ✅ Complete |
| **02** | `02 Brand Identity.pdf` | PDF | Brand name, taglines, logo symbolism, brand story, mission & vision, personality, color palette & typography | ✅ Complete |
| **03** | `03 Product Definition.pdf` | PDF | Product capabilities, 10 core modules, how it works, Priority Engine formulation, ARS score, competitive matrix | ✅ Complete |
| **04** | `04 User Journey Map.pdf` | PDF | 7 stages: Awareness → Discovery → Sign-up → First use → Core experience → Outcome → Retention | ✅ Complete |
| **05** | `05 UI UX Prototype - Figma Link.pdf`<br/>`05 UI UX Prototype - Figma Link.txt` | PDF & TXT | Official Figma Prototype (`https://www.figma.com/make/KN916hkdl3762ch5EnrQoV/backlift_ai?t=b51UAJWRmicmOZu8-1`), Live Web App link, and screen inventory | ✅ Complete |
| **06** | `06 Business Model.pdf` | PDF | Lean Canvas & Business Model Canvas, 9 building blocks, dual-engine monetization (B2C & B2B) | ✅ Complete |
| **07** | `07 Business Plan.pdf` | PDF | Executive summary, market sizing (TAM $8.4B, SAM $1.8B, SOM $140M), GTM strategy, competitive analysis, risk mitigation | ✅ Complete |
| **08** | `08 Financial Projection.xlsx` | Excel (.xlsx) | 6-sheet financial model: KPI summary, capex/setup, 3-year P&L, unit economics (CAC, LTV), break-even (Month 14), funding ask | ✅ Complete |
| **09** | `09 Landing Page - Live Link.pdf`<br/>`09 Landing Page - Live Link.txt` | PDF & TXT | Live URL access (`https://shambhavisharma2608-dot.github.io/backlift_ai/`), GitHub repo, hero section, interactive ARS demo, pricing | ✅ Complete |
| **10** | `10 AI Data Strategy.pdf` | PDF | Multi-tier LLM architecture (Gemini Flash/Pro), RAG pipeline, pgvector, Input→Processing→Output specs, ethical AI guardrails | ✅ Complete |
| **11** | `11 Dataset & Sources.pdf`<br/>`11 Dataset & Sources/` | PDF & Directory | Complete dataset specification document (450+ exams, 4,800+ questions, 10-year sample data table, research citations) + raw catalog directory | ✅ Complete |
| **12** | `12 Working AI Prototype Link.pdf`<br/>`run_prototype_demo.py` | PDF, TXT & Python | Working prototype access links (`https://shambhavisharma2608-dot.github.io/backlift_ai/`) + verification of the **5 core assignment evaluation queries** | ✅ Complete |

---

## 🌟 The Assignment's "Golden Rule" Alignment

```text
Problem → User → Journey → Solution → Business → Data → AI → Prototype
   [01]     [01/04]   [04]       [03]        [06/07]    [11]   [10]    [05/12]
```

Every single component in this submission folder directly connects to the sequential Golden Rule workflow, delivering an integrated, airtight startup project ready for internship evaluation and investor defense.

---

## 🚀 How Evaluators & Mentors Can Test Deliverables

1. **Direct In-Browser Live Testing (Zero Installation Needed):**
   - Click the live deployment link: **[https://shambhavisharma2608-dot.github.io/backlift_ai/](https://shambhavisharma2608-dot.github.io/backlift_ai/)**
   - The application opens on the **Home / Landing Page** with the interactive **Backlog Priority Calculator**.
   - Click **"Launch Dashboard"** or complete student verification (USN & OTP, Quick Evaluator Login, or New Student Registration) to enter the student workspace.
   - Navigate to **"AI Coach (LiftBot)"** and click the **Q1 to Q5 chips** to test the 5 assignment evaluation queries directly!

2. **Source Code & Git History Review:**
   - Review code, commits, and pull requests at: **[https://github.com/shambhavisharma2608-dot/backlift_ai](https://github.com/shambhavisharma2608-dot/backlift_ai)**

3. **Offline Automated CLI Prototype Demonstration:**
   ```bash
   python run_prototype_demo.py
   ```
   *Executes instant algorithmic verification of all 5 AI answers in any command prompt or terminal.*

4. **Local Development Server Execution:**
   ```bash
   cd backlift-ai
   npm install
   npm run dev
   ```
   *Opens local development server at `http://localhost:5174/`.*

---
*BackLift AI — Confidential & Proprietary Startup Submission*
""")

    print(f"\n[Summary] Writing master README.md -> {readme_path}")
    print("\n" + "=" * 78)
    print("[SUCCESS] ALL DELIVERABLES GENERATED SUCCESSFULLY IN:")
    print(f"Destination: {target_dir}")
    print("=" * 78)

    # Verification Inventory
    print("\nVerified Directory Inventory:")
    for root, dirs, files in os.walk(target_dir):
        rel_root = os.path.relpath(root, target_dir)
        indent = "  " if rel_root != "." else ""
        if rel_root != ".":
            print(f"📁 {rel_root}/")
        for f in sorted(files):
            full_f = os.path.join(root, f)
            sz = os.path.getsize(full_f)
            print(f"{indent}  • {f} ({sz:,} bytes)")

if __name__ == "__main__":
    run_master_build()
