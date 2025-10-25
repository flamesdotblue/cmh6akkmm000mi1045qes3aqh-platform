import React, { useState } from 'react';
import { useCMS } from './Store';
import { Settings, Plus, Trash2, Edit3, Save } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4">
    <h4 className="font-semibold text-slate-900">{title}</h4>
    <div className="mt-3">{children}</div>
  </div>
);

const Row = ({ actions, children }) => (
  <div className="flex items-start justify-between gap-3 rounded-md border border-slate-200 p-3">
    <div>{children}</div>
    <div className="flex shrink-0 items-center gap-2">{actions}</div>
  </div>
);

const AdminPanel = () => {
  const cms = useCMS();
  const [tab, setTab] = useState('posts');

  // Draft states
  const [post, setPost] = useState({ title: '', excerpt: '', tag: '', url: '' });
  const [project, setProject] = useState({ title: '', description: '', tags: '', link: '' });
  const [member, setMember] = useState({ name: '', role: '' });
  const [plan, setPlan] = useState({ name: '', price: '', features: '' });
  const [testimonial, setTestimonial] = useState({ name: '', text: '', rating: 5 });
  const [service, setService] = useState({ slug: '', title: '', desc: '', bullets: '' });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-700"><Settings className="h-5 w-5" /><h1 className="text-xl font-semibold">Admin Dashboard</h1></div>
        <div className="flex items-center gap-2 text-sm">
          {['posts','projects','team','pricing','testimonials','services','contact'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`rounded-md px-3 py-1.5 ${tab===t ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50'}`}>{t}</button>
          ))}
        </div>
      </div>

      {tab === 'posts' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section title="New Post">
            <div className="grid gap-3">
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Title" value={post.title} onChange={(e)=>setPost({...post,title:e.target.value})} />
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Excerpt" value={post.excerpt} onChange={(e)=>setPost({...post,excerpt:e.target.value})} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input className="rounded border border-slate-300 px-3 py-2" placeholder="Tag" value={post.tag} onChange={(e)=>setPost({...post,tag:e.target.value})} />
                <input className="rounded border border-slate-300 px-3 py-2" placeholder="External URL" value={post.url} onChange={(e)=>setPost({...post,url:e.target.value})} />
              </div>
              <button className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white" onClick={()=>{ if(!post.title.trim())return; cms.addPost(post); setPost({ title:'',excerpt:'',tag:'',url:'' }); }}><Plus className="h-4 w-4"/>Add Post</button>
            </div>
          </Section>
          <Section title="Posts">
            <div className="space-y-3">
              {cms.posts.map((p)=>{
                const [editing,setEditing] = [p.__editing,()=>{}]; // placeholder variable to satisfy linter
                return (
                  <Row key={p.id} actions={(
                    <>
                      <button onClick={()=>{ const title=prompt('Title',p.title)||p.title; const excerpt=prompt('Excerpt',p.excerpt)||p.excerpt; const tag=prompt('Tag',p.tag)||p.tag; const url=prompt('URL',p.url||'')||p.url; cms.updatePost(p.id,{title,excerpt,tag,url}); }} className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50"><Edit3 className="h-4 w-4"/></button>
                      <button onClick={()=>cms.deletePost(p.id)} className="rounded px-2 py-1 text-rose-700 hover:bg-rose-50"><Trash2 className="h-4 w-4"/></button>
                    </>
                  )}>
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-sm text-slate-600">{p.excerpt}</div>
                      <div className="text-xs text-slate-500">{p.tag} · {new Date(p.createdAt).toLocaleDateString()}</div>
                    </div>
                  </Row>
                );
              })}
            </div>
          </Section>
        </div>
      )}

      {tab === 'projects' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section title="New Project">
            <div className="grid gap-3">
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Title" value={project.title} onChange={(e)=>setProject({...project,title:e.target.value})} />
              <textarea className="rounded border border-slate-300 px-3 py-2" rows={3} placeholder="Description" value={project.description} onChange={(e)=>setProject({...project,description:e.target.value})} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input className="rounded border border-slate-300 px-3 py-2" placeholder="Tags (comma separated)" value={project.tags} onChange={(e)=>setProject({...project,tags:e.target.value})} />
                <input className="rounded border border-slate-300 px-3 py-2" placeholder="Project URL" value={project.link} onChange={(e)=>setProject({...project,link:e.target.value})} />
              </div>
              <button className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white" onClick={()=>{ if(!project.title.trim())return; const payload={...project,tags:project.tags?project.tags.split(',').map(t=>t.trim()).filter(Boolean):[]}; cms.addProject(payload); setProject({ title:'', description:'', tags:'', link:'' }); }}><Plus className="h-4 w-4"/>Add Project</button>
            </div>
          </Section>
          <Section title="Projects">
            <div className="space-y-3">
              {cms.projects.map((p)=> (
                <Row key={p.id} actions={(
                  <>
                    <button onClick={()=>{ const title=prompt('Title',p.title)||p.title; const description=prompt('Description',p.description)||p.description; const tagsRaw=prompt('Tags', (p.tags||[]).join(', '))|| (p.tags||[]).join(', '); const link=prompt('Link',p.link||'')||p.link; const tags = tagsRaw.split(',').map(t=>t.trim()).filter(Boolean); cms.updateProject(p.id,{title,description,tags,link}); }} className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50"><Edit3 className="h-4 w-4"/></button>
                    <button onClick={()=>cms.deleteProject(p.id)} className="rounded px-2 py-1 text-rose-700 hover:bg-rose-50"><Trash2 className="h-4 w-4"/></button>
                  </>
                )}>
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-slate-600">{p.description}</div>
                    <div className="mt-1 flex flex-wrap gap-1">{(p.tags||[]).map(t=> <span key={t} className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{t}</span>)}</div>
                  </div>
                </Row>
              ))}
            </div>
          </Section>
        </div>
      )}

      {tab === 'team' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section title="New Member">
            <div className="grid gap-3">
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Name" value={member.name} onChange={(e)=>setMember({...member,name:e.target.value})} />
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Role" value={member.role} onChange={(e)=>setMember({...member,role:e.target.value})} />
              <button className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white" onClick={()=>{ if(!member.name.trim())return; cms.addMember(member); setMember({name:'',role:''}); }}><Plus className="h-4 w-4"/>Add Member</button>
            </div>
          </Section>
          <Section title="Team">
            <div className="space-y-3">
              {cms.team.map((m)=> (
                <Row key={m.id} actions={(
                  <>
                    <button onClick={()=>{ const name=prompt('Name',m.name)||m.name; const role=prompt('Role',m.role)||m.role; cms.updateMember(m.id,{name,role}); }} className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50"><Edit3 className="h-4 w-4"/></button>
                    <button onClick={()=>cms.deleteMember(m.id)} className="rounded px-2 py-1 text-rose-700 hover:bg-rose-50"><Trash2 className="h-4 w-4"/></button>
                  </>
                )}>
                  <div className="font-medium">{m.name} <span className="text-sm text-slate-500">— {m.role}</span></div>
                </Row>
              ))}
            </div>
          </Section>
        </div>
      )}

      {tab === 'pricing' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section title="New Plan">
            <div className="grid gap-3">
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Name" value={plan.name} onChange={(e)=>setPlan({...plan,name:e.target.value})} />
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Price" value={plan.price} onChange={(e)=>setPlan({...plan,price:e.target.value})} />
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Features (comma separated)" value={plan.features} onChange={(e)=>setPlan({...plan,features:e.target.value})} />
              <button className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white" onClick={()=>{ if(!plan.name.trim())return; const features = plan.features? plan.features.split(',').map(x=>x.trim()).filter(Boolean):[]; cms.addPlan({ ...plan, features, highlight:false }); setPlan({ name:'', price:'', features:'' }); }}><Plus className="h-4 w-4"/>Add Plan</button>
            </div>
          </Section>
          <Section title="Plans">
            <div className="space-y-3">
              {cms.pricing.map((pl)=> (
                <Row key={pl.id} actions={(
                  <>
                    <button onClick={()=>{ const name=prompt('Name',pl.name)||pl.name; const price=prompt('Price',pl.price)||pl.price; const featuresRaw=prompt('Features', (pl.features||[]).join(', '))|| (pl.features||[]).join(', '); const highlight=window.confirm('Highlight this plan? OK=Yes / Cancel=No'); const features=featuresRaw.split(',').map(x=>x.trim()).filter(Boolean); cms.updatePlan(pl.id,{name,price,features,highlight}); }} className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50"><Edit3 className="h-4 w-4"/></button>
                    <button onClick={()=>cms.deletePlan(pl.id)} className="rounded px-2 py-1 text-rose-700 hover:bg-rose-50"><Trash2 className="h-4 w-4"/></button>
                  </>
                )}>
                  <div>
                    <div className="font-medium">{pl.name} {pl.highlight ? <span className="ml-2 rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">Popular</span> : null}</div>
                    <div className="text-sm text-slate-600">{pl.price}</div>
                    <div className="mt-1 flex flex-wrap gap-1">{(pl.features||[]).map(f=> <span key={f} className="rounded bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700">{f}</span>)}</div>
                  </div>
                </Row>
              ))}
            </div>
          </Section>
        </div>
      )}

      {tab === 'testimonials' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section title="New Feedback">
            <div className="grid gap-3">
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Client name" value={testimonial.name} onChange={(e)=>setTestimonial({...testimonial,name:e.target.value})} />
              <textarea className="rounded border border-slate-300 px-3 py-2" rows={3} placeholder="Feedback" value={testimonial.text} onChange={(e)=>setTestimonial({...testimonial,text:e.target.value})} />
              <input className="rounded border border-slate-300 px-3 py-2" type="number" min={1} max={5} placeholder="Rating (1-5)" value={testimonial.rating} onChange={(e)=>setTestimonial({...testimonial,rating:Number(e.target.value)})} />
              <button className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white" onClick={()=>{ if(!testimonial.name.trim()||!testimonial.text.trim())return; cms.addTestimonial(testimonial); setTestimonial({ name:'', text:'', rating:5 }); }}><Plus className="h-4 w-4"/>Add Feedback</button>
            </div>
          </Section>
          <Section title="Feedback">
            <div className="space-y-3">
              {cms.testimonials.map((fb)=> (
                <Row key={fb.id} actions={(
                  <>
                    <button onClick={()=>{ const name=prompt('Name',fb.name)||fb.name; const text=prompt('Text',fb.text)||fb.text; const ratingRaw=prompt('Rating (1-5)', String(fb.rating))||String(fb.rating); const rating = Math.max(1, Math.min(5, Number(ratingRaw))); cms.updateTestimonial(fb.id,{name,text,rating}); }} className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50"><Edit3 className="h-4 w-4"/></button>
                    <button onClick={()=>cms.deleteTestimonial(fb.id)} className="rounded px-2 py-1 text-rose-700 hover:bg-rose-50"><Trash2 className="h-4 w-4"/></button>
                  </>
                )}>
                  <div>
                    <div className="font-medium">{fb.name} <span className="text-xs text-slate-500">({fb.rating}/5)</span></div>
                    <div className="text-sm text-slate-600">{fb.text}</div>
                  </div>
                </Row>
              ))}
            </div>
          </Section>
        </div>
      )}

      {tab === 'services' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Section title="New Service">
            <div className="grid gap-3">
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Slug (e.g., web-development)" value={service.slug} onChange={(e)=>setService({...service,slug:e.target.value})} />
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Title" value={service.title} onChange={(e)=>setService({...service,title:e.target.value})} />
              <textarea className="rounded border border-slate-300 px-3 py-2" rows={3} placeholder="Description" value={service.desc} onChange={(e)=>setService({...service,desc:e.target.value})} />
              <input className="rounded border border-slate-300 px-3 py-2" placeholder="Bullets (comma separated)" value={service.bullets} onChange={(e)=>setService({...service,bullets:e.target.value})} />
              <button className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white" onClick={()=>{ if(!service.slug.trim()||!service.title.trim())return; const bullets = service.bullets? service.bullets.split(',').map(x=>x.trim()).filter(Boolean):[]; cms.addService({ ...service, bullets }); setService({ slug:'', title:'', desc:'', bullets:'' }); }}><Plus className="h-4 w-4"/>Add Service</button>
            </div>
          </Section>
          <Section title="Services">
            <div className="space-y-3">
              {cms.services.map((sv)=> (
                <Row key={sv.id} actions={(
                  <>
                    <button onClick={()=>{ const slug=prompt('Slug',sv.slug)||sv.slug; const title=prompt('Title',sv.title)||sv.title; const desc=prompt('Description',sv.desc)||sv.desc; const bulletsRaw=prompt('Bullets', (sv.bullets||[]).join(', '))|| (sv.bullets||[]).join(', '); const bullets=bulletsRaw.split(',').map(x=>x.trim()).filter(Boolean); cms.updateService(sv.id,{slug,title,desc,bullets}); }} className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50"><Edit3 className="h-4 w-4"/></button>
                    <button onClick={()=>cms.deleteService(sv.id)} className="rounded px-2 py-1 text-rose-700 hover:bg-rose-50"><Trash2 className="h-4 w-4"/></button>
                  </>
                )}>
                  <div>
                    <div className="font-medium">{sv.title} <span className="text-xs text-slate-500">/{sv.slug}</span></div>
                    <div className="text-sm text-slate-600">{sv.desc}</div>
                  </div>
                </Row>
              ))}
            </div>
          </Section>
        </div>
      )}

      {tab === 'contact' && (
        <Section title="Contact Details">
          <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <input className="rounded border border-slate-300 px-3 py-2" placeholder="Email" defaultValue={cms.contact.email} onBlur={(e)=>cms.updateContact({ email: e.target.value })} />
            <input className="rounded border border-slate-300 px-3 py-2" placeholder="Phone" defaultValue={cms.contact.phone} onBlur={(e)=>cms.updateContact({ phone: e.target.value })} />
            <input className="sm:col-span-2 rounded border border-slate-300 px-3 py-2" placeholder="Address" defaultValue={cms.contact.address} onBlur={(e)=>cms.updateContact({ address: e.target.value })} />
            <button className="sm:col-span-2 inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white"><Save className="h-4 w-4"/>Saved on blur</button>
          </div>
        </Section>
      )}
    </div>
  );
};

export default AdminPanel;
