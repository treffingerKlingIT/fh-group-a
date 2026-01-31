import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export type TipCategory = 'all' | 'housing' | 'mobility' | 'electricity' | 'food';
export type TipType = 'education' | 'project';

export interface Tip {
  id: string;
  title: string;
  image: string;
  category: Exclude<TipCategory, 'all'>;
  type: TipType;
  location?: string;
}

export interface TipDetail extends Tip {
  heroImage: string;
  sections: {
    title: string;
    content: string;
  }[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  facts?: {
    place?: string;
    location?: string;
    projectName?: string;
    activeSince?: string;
    partners?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  private mockTips: Tip[] = [
    // Housing tips
    {
      id: 'h1',
      title: 'How to start collecting energy at home',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      category: 'housing',
      type: 'education'
    },
    {
      id: 'h2',
      title: 'Insulation tips to reduce heating costs',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      category: 'housing',
      type: 'education'
    },
    {
      id: 'h3',
      title: 'Smart home devices for energy efficiency',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      category: 'housing',
      type: 'education'
    },

    // Mobility tips
    {
      id: 'm1',
      title: 'Electric vehicles: A complete guide',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
      category: 'mobility',
      type: 'education'
    },
    {
      id: 'm2',
      title: 'Bike-sharing initiative in Amsterdam',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      category: 'mobility',
      type: 'project',
      location: 'Amsterdam, Netherlands'
    },
    {
      id: 'm3',
      title: 'Public transit tips for commuters',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
      category: 'mobility',
      type: 'education'
    },

    // Electricity tips
    {
      id: 'e1',
      title: 'Solar panel installation guide',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      category: 'electricity',
      type: 'education'
    },
    {
      id: 'e2',
      title: 'Community solar project in Germany',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
      category: 'electricity',
      type: 'project',
      location: 'Berlin, Germany'
    },
    {
      id: 'e3',
      title: 'Reducing standby power consumption',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      category: 'electricity',
      type: 'education'
    },

    // Food tips
    {
      id: 'f1',
      title: 'Collecting waste in Brazil',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      category: 'food',
      type: 'project',
      location: 'Sao Paolo, Brazil'
    },
    {
      id: 'f2',
      title: 'Plant-based diet for a healthier planet',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      category: 'food',
      type: 'education'
    },
    {
      id: 'f3',
      title: 'Reducing food waste at home',
      image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80',
      category: 'food',
      type: 'education'
    }
  ];

  private mockTipDetails: { [key: string]: TipDetail } = {
    'h1': {
      id: 'h1',
      title: 'How to start collecting energy at home',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
      heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80',
      category: 'housing',
      type: 'education',
      sections: [
        {
          title: 'Getting Started with Home Energy',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          title: 'Solar Panel Basics',
          content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          title: 'Battery Storage Solutions',
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        }
      ],
      quote: {
        text: 'Installing solar panels can transform your home\'s energy usage, curb costs, and offer long-term financial and environmental benefits.',
        author: 'Robert Sinner',
        role: 'Energy Consultant'
      }
    },
    'f1': {
      id: 'f1',
      title: 'Collecting waste in Brazil',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      category: 'food',
      type: 'project',
      location: 'Sao Paolo, Brazil',
      sections: [
        {
          title: 'Community Engagement in Coastal Cleanup',
          content: 'In Sao Paolo, volunteers gather to clean beaches and mangroves, removing plastic and waste to protect marine ecosystems. These efforts not only preserve the natural beauty of the coastline but also promote environmental awareness among participants.'
        },
        {
          title: 'Artistic Collaboration for Awareness',
          content: 'Collaborations with artists, such as Eduardo Srur, have been instrumental in raising public consciousness about plastic pollution through creative installation and events.'
        },
        {
          title: 'Educational Outreach and Sustainable Practices',
          content: 'The cleanup projects often include educational components teaching participants about the impacts of pollution and the importance of sustainable practices to maintain healthy coastal environments.'
        }
      ],
      quote: {
        text: 'Every piece of waste we collect from our beaches is a step towards preserving our oceans for future generations.',
        author: 'Maria Santos',
        role: 'Project Coordinator'
      },
      facts: {
        place: 'The beach cleanup initiative takes place along the coastline of Sao Paulo, Brazil, encompassing municipalities such as Cananeia, Itanhaem, and Ubatuba.',
        location: 'Sao Paulo, Brazil',
        projectName: 'Sao Paulo Beach Cleanup Initiative',
        activeSince: '2022',
        partners: 'Local NGOs, City of Sao Paulo, DHL, Artist Eduardo Srur'
      }
    }
  };

  constructor() {}

  getTips(): Observable<Tip[]> {
    return of(this.mockTips).pipe(delay(300));
  }

  getTipsByCategory(category: TipCategory): Observable<Tip[]> {
    if (category === 'all') {
      return this.getTips();
    }
    const filtered = this.mockTips.filter(tip => tip.category === category);
    return of(filtered).pipe(delay(300));
  }

  getTipById(id: string): Observable<TipDetail | null> {
    // If we have detailed data, return it
    if (this.mockTipDetails[id]) {
      return of(this.mockTipDetails[id]).pipe(delay(300));
    }

    // Otherwise, generate detail from basic tip data
    const tip = this.mockTips.find(t => t.id === id);
    if (!tip) {
      return of(null).pipe(delay(300));
    }

    const generatedDetail: TipDetail = {
      ...tip,
      heroImage: tip.image.replace('w=800', 'w=1200'),
      sections: [
        {
          title: 'Introduction',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
        },
        {
          title: 'Key Benefits',
          content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          title: 'Getting Started',
          content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        }
      ],
      quote: {
        text: 'Taking small steps towards sustainability can lead to significant positive changes for our planet.',
        author: 'Environmental Expert',
        role: 'Sustainability Advisor'
      }
    };

    if (tip.type === 'project' && tip.location) {
      generatedDetail.facts = {
        location: tip.location,
        projectName: tip.title,
        activeSince: '2023',
        partners: 'Local Organizations, Environmental Groups'
      };
    }

    return of(generatedDetail).pipe(delay(300));
  }
}
