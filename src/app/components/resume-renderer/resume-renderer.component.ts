import { Component, Input } from '@angular/core';
declare var html2pdf: any; 

@Component({
  selector: 'app-resume-renderer',
  templateUrl: './resume-renderer.component.html',
  styleUrls: ['./resume-renderer.component.scss']
})
export class ResumeRendererComponent {
  @Input() template: string = 'modern';
  @Input() data: any;

  // Default Experience
  defaultExperience = [
    {
      role: 'Software Engineer',
      company: 'Tech Corp',
      duration: '2019 - Present',
      details: [
        'Developed scalable Angular apps',
        'Led frontend team of 5 developers',
        'Improved app performance by 30%'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'Web Solutions',
      duration: '2016 - 2019',
      details: [
        'Built responsive UI with Angular & Bootstrap',
        'Collaborated with designers & backend team'
      ]
    }
  ];

  // Default Education
  defaultEducation = [
    { degree: 'B.Tech in Computer Science', institution: 'IIT Delhi', year: '2012 - 2016' }
  ];

  // Default Projects
  defaultProjects = [
    {
      name: 'Resume Builder App',
      description: 'Built an Angular-based resume builder with live preview and PDF export.',
      link: 'https://github.com/example/resume-builder'
    },
    {
      name: 'E-commerce Store',
      description: 'Created a full-stack MERN app for online shopping with payment gateway integration.'
    }
  ];

  // Default Certifications
  defaultCertifications = [
    'AWS Certified Solutions Architect',
    'Google Cloud Professional Developer',
    'Scrum Master Certification'
  ];

  // Default Languages
  defaultLanguages = ['English', 'Hindi'];

  // Default Links
  defaultLinks = {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    portfolio: 'https://johndoe.dev'
  };

  downloadPDF() {
    // Select the currently visible resume template
    const element: any = document.querySelector('.resume');

    if (!element) {
      alert('No resume template found!');
      return;
    }

    const options = {
      margin: [0.1, 0.1, 0.1, 0.1], // top, left, bottom, right in inches
      filename: `${this.data?.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf().set(options).from(element).save();
  }
}
