export namespace ollama {
	
	export class LocalModelDetails {
	    format: string;
	    family: string;
	    parameter_size: string;
	    quantization_level: string;
	    families: string[];
	
	    static createFrom(source: any = {}) {
	        return new LocalModelDetails(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.format = source["format"];
	        this.family = source["family"];
	        this.parameter_size = source["parameter_size"];
	        this.quantization_level = source["quantization_level"];
	        this.families = source["families"];
	    }
	}
	export class LocalModel {
	    name: string;
	    modified_at: string;
	    size: number;
	    digest: string;
	    details: LocalModelDetails;
	
	    static createFrom(source: any = {}) {
	        return new LocalModel(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.modified_at = source["modified_at"];
	        this.size = source["size"];
	        this.digest = source["digest"];
	        this.details = this.convertValues(source["details"], LocalModelDetails);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class ModelOptions {
	    mirostat: number;
	    mirostat_eta: number;
	    mirostat_tau: number;
	    num_ctx: number;
	    repeat_last_n: number;
	    repeat_penalty: number;
	    temperature: number;
	    seed: number;
	    tfs_z: number;
	    num_predict: number;
	    top_k: number;
	    top_p: number;
	
	    static createFrom(source: any = {}) {
	        return new ModelOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.mirostat = source["mirostat"];
	        this.mirostat_eta = source["mirostat_eta"];
	        this.mirostat_tau = source["mirostat_tau"];
	        this.num_ctx = source["num_ctx"];
	        this.repeat_last_n = source["repeat_last_n"];
	        this.repeat_penalty = source["repeat_penalty"];
	        this.temperature = source["temperature"];
	        this.seed = source["seed"];
	        this.tfs_z = source["tfs_z"];
	        this.num_predict = source["num_predict"];
	        this.top_k = source["top_k"];
	        this.top_p = source["top_p"];
	    }
	}

}

