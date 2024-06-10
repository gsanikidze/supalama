export namespace ollama {
	
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

