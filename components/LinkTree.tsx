import React from 'react';
import { LinkGroupData } from '../types';
import { ICONS } from '../constants';
import { ExternalLink } from 'lucide-react';

interface LinkTreeProps {
  group: LinkGroupData;
}

const LinkTree: React.FC<LinkTreeProps> = ({ group }) => {
  return (
    <div className="flex flex-col p-8 bg-zinc-950/80 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all w-full h-full shadow-lg group-hover:shadow-xl min-h-[300px]">
      {/* Root Node */}
      <div className="text-2xl font-bold text-zinc-200 mb-8 uppercase tracking-widest border-b border-white/10 pb-4 font-mono">
        {group.title}
      </div>

      {/* Tree Branches */}
      <div className="flex flex-col gap-6 relative pl-2 flex-1">
         {/* Vertical trunk line */}
        <div className="absolute left-2 top-0 bottom-8 w-px bg-zinc-800"></div>

        {group.items.map((item, index) => {
          const Icon = item.icon ? ICONS[item.icon] : ExternalLink;
          const isLast = index === group.items.length - 1;

          return (
            <a
              key={item.url}
              href={item.url}
              className="group/item flex items-center gap-6 text-zinc-400 hover:text-white transition-colors relative pl-10 py-1"
            >
              {/* Horizontal branch line */}
              <div className={`absolute left-2 top-1/2 w-10 h-px bg-zinc-800 -translate-y-1/2 group-hover/item:bg-zinc-500 transition-colors`}></div>
              {/* Corner for last item to hide vertical line extension */}
              {isLast && (
                <div className="absolute left-2 top-1/2 bottom-0 w-px bg-zinc-950/80"></div> 
              )}
              
              <Icon className="w-7 h-7 opacity-70 group-hover/item:opacity-100 transition-opacity" />
              <span className="font-mono text-xl group-hover/item:translate-x-1 transition-transform font-medium">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default LinkTree;